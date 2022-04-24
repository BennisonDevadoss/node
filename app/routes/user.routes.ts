import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http'
import UserController from '../controllers/users.controllers';

function users(fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>, opts, next: (err?: Error) => void) {
    fastify.post('/users', UserController.create);
    next();
}