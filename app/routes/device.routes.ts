// import * as DeviceController from '';
// import { FastifyInstance } from "fastify";
import * as DeviceController from "../controllers/device.controllers";
import { IncomingMessage, Server, ServerResponse } from "http";
import { FastifyInstance } from "fastify";
// import { createDeviceSchema, updateDeviceSchema, listDeviceSchema } from './device.schema'

function devices(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: any,
  next: (err?: Error) => void
) {
  fastify.post("/devices", DeviceController.create);
  fastify.put("/devices/:id", DeviceController.update);
  fastify.get("/devices", DeviceController.list);
  next();
}
export default devices;
