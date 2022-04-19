import fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

const server: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({
  logger: true
});

function build() {
  server.register(require('./routes/device.routes'));
  return server;
}

export default build;
