import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as SessionsController from '../controllers/sessions.controller';
import { signinSchema, signoutSchema } from './session.schema';

function session(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts,
  next: (err?: Error) => void
) {
  fastify.post('/signin', signinSchema, SessionsController.signin);
  fastify.delete('/signout', signoutSchema, SessionsController.signout);
  next();
}

export default session;
