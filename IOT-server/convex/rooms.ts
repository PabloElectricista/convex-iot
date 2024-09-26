import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const getRooms = internalQuery({
  async handler(ctx) {
    return await ctx.db.query("rooms").collect();
  },
});

export const getRoom = internalQuery({
  args: {roomId: v.id('rooms')},
  handler: async(ctx, {roomId}) => {
    return await ctx.db.get(roomId)
  }
})

export const addRoom = internalMutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    return ctx.db.insert("rooms", { name });
  },
});
