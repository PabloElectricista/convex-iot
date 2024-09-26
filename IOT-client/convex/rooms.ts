import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getRooms = query({
  async handler(ctx) {
    return await ctx.db.query("rooms").collect();
  },
});

export const getRoom = query({
  args: {roomId: v.id('rooms')},
  handler: async(ctx, {roomId}) => {
    return await ctx.db.get(roomId)
  }
})

export const addRoom = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    return ctx.db.insert("rooms", { name });
  },
});
