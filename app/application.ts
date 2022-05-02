import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import { IncomingMessage, Server, ServerResponse } from 'http';
import renderError from './lib/render-error';
import swaggerOptions from './lib/swagger';
import privateRoutes from './routes/private.routes';
import publicRoutes from './routes/public.routes';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true,
  });

function build() {
  server.setErrorHandler((error, req, reply) => {
    renderError(reply, error);
  });
  server.register(swagger, swaggerOptions);
  server.register(privateRoutes);
  server.register(publicRoutes);
  return server;
}
export default build;
