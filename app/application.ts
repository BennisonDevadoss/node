import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import renderError from "./lib/render-error";
import privateRoutes from "./routes/private.routes";
import publicRoutes from "./routes/public.routes";
// console.log('private Route is ', privateRoutes);

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true,
  });

function build() {
  // server.register(require("./routes/private.routes"));
  // server.register(require("./routes/public.routes"));
  server.setErrorHandler((error, req, reply) => {
    renderError(reply, error);
  });

  server.register(privateRoutes);
  server.register(publicRoutes);
  return server;
}
export default build;
