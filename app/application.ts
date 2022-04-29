import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import renderError from "./lib/render-error";
import privateRoutes from "./routes/private.routes";
import publicRoutes from "./routes/public.routes";
import swagger from "fastify-swagger";
import swaggerOptions from "./lib/swagger";

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
