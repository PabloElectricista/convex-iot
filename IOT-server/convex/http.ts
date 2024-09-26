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
    const room = await ctx.runMutation(internal.rooms.addRoom, { name });
    return new Response(JSON.stringify(room), { status: 200 });
  }),
});

http.route({
  path: "/devices",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const room = request.url.split("?")[1].split("=")[1] as Id<"rooms">;
    const devices =
      (await ctx.runQuery(internal.devices.getDevices, { room })) || [];
    return new Response(JSON.stringify(devices), { status: 200 });
  }),
});

http.route({
  path: "/devices",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const device = await request.json();
    await ctx.runMutation(internal.devices.addDevice, device);
    return new Response(null, { status: 200 });
  }),
});

http.route({
  path: "/devices",
  method: "PATCH",
  handler: httpAction(async (ctx, request) => {
    const device = await request.json();
    await ctx.runMutation(internal.devices.updateDevice, device);
    return new Response(null, { status: 200 });
  }),
});

http.route({
  path: "/toggle",
  method: "PATCH",
  handler: httpAction(async (ctx, request) => {
    const { id, status } = await request.json();
    const result = await fetch(`http://localhost:3000/devices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({status})
    })
    return new Response(JSON.stringify(result), { status: 200 });
  }),
});

export default http;
