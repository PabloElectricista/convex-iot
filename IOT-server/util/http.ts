import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/",
  method: "GET",
  handler: httpAction(async () => new Response("ok", { status: 200 })),
});

http.route({
  path: "/rooms",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const rooms = (await ctx.runQuery(internal.rooms.getRooms)) || [];
    return new Response(JSON.stringify(rooms), { status: 200 });
  }),
});

http.route({
  path: "/rooms",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { name } = await request.json();
    const room =
      (await ctx.runMutation(internal.rooms.addRoom, { name }));
    return new Response(JSON.stringify(room), { status: 200 });
  }),
});

http.route({
  path: "/devices",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const roomId = request.url.split("?")[1].split("=")[1] as Id<'rooms'>;
    const devices =
      (await ctx.runQuery(internal.devices.getDevices, { roomId })) || [];
    return new Response(JSON.stringify(devices), { status: 200 });
  }),
});

http.route({
  path: "/devices",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { name, status, roomId } = await request.json();
    const room =
      (await ctx.runMutation(internal.devices.addDevice, { name, status, roomId }));
    return new Response(JSON.stringify(room), { status: 200 });
  }),
});

export default http;
