import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { deviceType } from "./schema";

export const getDevices = internalQuery({
  args: { room: v.id("rooms") },
  handler: async (ctx, { room }) => {
    return await ctx.db
      .query("devices")
      .withIndex("by_roomId", (q) => q.eq("room", room))
      .collect();
  },
});

export const addDevice = internalMutation({
  args: {
    room: v.id("rooms"),
    name: v.string(),
    status: v.string(),
    type: deviceType,
    isOutput: v.boolean(),
    address: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("devices", args);
  },
});

export const updateDevice = internalMutation({
  args: {
    deviceId: v.id("devices"),
    name: v.string(),
    address: v.string(),
    status: v.string(),
    room: v.id("rooms"),
    type: deviceType,
    isOutput: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { deviceId, ...device} = args;
    return await ctx.db.patch(deviceId, device);
  },
});

export const toggleDeciceStatus = internalMutation({
  args: { id: v.id("devices"), status: v.string() },
  handler: async (ctx, { id, status }) => {
    try {
      await ctx.db.patch(id, { status: status });
    } catch (error) {
      throw new ConvexError(error)
    }
  },
});
