import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const deviceType = v.union(
  v.literal('switch'),
  v.literal('analogical')
)

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
  }),
  devices: defineTable({
    name: v.string(),
    status: v.string(),
    address: v.string(),
    type: deviceType,
    isOutput: v.boolean(),
    room: v.id('rooms')
  })
  .index('by_roomId', ['room'])
});
