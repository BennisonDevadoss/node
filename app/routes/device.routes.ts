import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as DeviceController from '../controllers/device.controllers';
import {
  createDeviceSchema,
  listDeviceSchema,
  updateDeviceSchema,
} from './device.schema';

function devices(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: any,
  next: (err?: Error) => void
) {
  fastify.post('/devices', createDeviceSchema, DeviceController.create);
  fastify.put('/devices/:id', updateDeviceSchema, DeviceController.update);
  fastify.get('/devices', listDeviceSchema, DeviceController.list);
  next();
}
export default devices;
