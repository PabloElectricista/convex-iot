import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { deviceType } from "./schema";

export const getDevices = query({
  args: { room: v.id("rooms") },
  handler: async (ctx, { room }) => {
    return await ctx.db
      .query("devices")
      .withIndex("by_roomId", (q) => q.eq("room", room))
      .collect();
  },
});

export const addDevice = mutation({
  args: {
    room: v.id("rooms"),
    name: v.string(),
    status: v.string(),
    type: deviceType,
    isOutput: v.boolean(),
    address:v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("devices", args);
  },
});

export const updateDevice = mutation({
  args: {
    deviceId: v.id("devices"),
    name: v.string(),
    address: v.string(),
    status: v.string(),
    room: v.id("rooms"),
    type: deviceType,
    isOutput: v.boolean()
  },
  handler: async (ctx, args) => {
    const { deviceId, ...device} = args;
    return await ctx.db.patch(deviceId, device);
  },
});
