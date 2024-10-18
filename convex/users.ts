//this is our API endpoint for getting our users data.
import { query } from './_generated/server';

import { getAuthUserId } from '@convex-dev/auth/server';

export const current = query({
  args: {},
  //handler has access to the database and the context.
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    return await ctx.db.get(userId);
  }
});
