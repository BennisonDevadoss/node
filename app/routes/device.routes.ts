// import * as DeviceController from '';
// import { FastifyInstance } from "fastify";
import * as DeviceController from '../controllers/device.controllers'
import { IncomingMessage, Server, ServerResponse } from 'http';
import { FastifyInstance, } from 'fastify';
import { createDeviceSchema, updateDeviceSchema } from './device.schema'

function deviceConfiguraions(fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>, options: any, done: (err?: Error) => void) {

    fastify.get('/devices', DeviceController.list)
    fastify.post('/devices', createDeviceSchema, DeviceController.create);
    fastify.put('/devices/:id', updateDeviceSchema, DeviceController.update)

    done();
}

export default deviceConfiguraions;
