import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
export const create = mutation({
  args: {
    name: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Unauthorized');
    }
    //TODO: create a proper method later
    const joinCode = '123456';
    const workspaceId = await ctx.db.insert('workspaces', {
      name: args.name,
      joinCode,
      userId
    });
    return workspaceId;
  }
});

export const get = query({
  args: {},
  handler: async ctx => {
    //will return all workspaces for the current user.
    return await ctx.db.query('workspaces').collect();
  }
});
