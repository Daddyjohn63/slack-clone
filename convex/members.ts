import { v } from 'convex/values';
import { query, QueryCtx } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { Id } from './_generated/dataModel';
//This is a utility function that fetches a user's complete information from the database given their ID.
const populateUser = (ctx: QueryCtx, id: Id<'users'>) => {
  return ctx.db.get(id);
};

//This function fetches all members of a workspace, including their user data.
export const get = query({
  args: { workspaceId: v.id('workspaces') },
  handler: async (ctx, args) => {
    console.log('🔍 Querying workspace:', args.workspaceId);
    // Step 1: Authentication Check
    const userId = await getAuthUserId(ctx);
    console.log('👤 Current userId:', userId);
    if (!userId) {
      console.log('❌ No userId found, returning empty array');
      return [];
    }
    // Step 2: Membership Verification
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_user_id', q =>
        q.eq('workspaceId', args.workspaceId).eq('userId', userId)
      )
      .unique();
    console.log('🔑 Current user membership:', member);
    if (!member) {
      console.log('❌ No membership found, returning empty array');
      return [];
    }
    // Step 3: Fetch All Members
    const data = await ctx.db
      .query('members')
      .withIndex('by_workspace_id', q => q.eq('workspaceId', args.workspaceId))
      .collect();
    console.log('👥 All workspace members:', data);
    // Step 4: Populate User Data
    const members = [];
    for (const member of data) {
      const user = await populateUser(ctx, member.userId);
      console.log('ℹ️ User data for member:', member.userId, user);
      members.push({
        ...member,
        user
      });
    }
    console.log('✅ Final members array:', members);
    return members;
  }
});

export const current = query({
  args: { workspaceId: v.id('workspaces') },
  handler: async (ctx, args) => {
    //do we have a user?
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    //do we have a member that belongs to this workspace?
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_user_id', q =>
        q.eq('workspaceId', args.workspaceId).eq('userId', userId)
      )
      .unique();
    if (!member) {
      return null;
    }
    return member;
  }
});
