import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const watchEvents = query({
  async handler(ctx) {
    return await ctx.db.query("events").collect();
  },
});

export const fireEvent = mutation({
  args: {
    room: v.string(),
    status: v.boolean()
  },
  async handler(ctx, args) {
    
  },
})
