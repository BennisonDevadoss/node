import { FastifyInstance } from "fastify";
import sessionRoutes from "./session.routes";
function publicRoutes(
  fastify: FastifyInstance,
  opts,
  next: (err?: Error) => void
) {
  fastify.register(sessionRoutes);
  next();
}

export default publicRoutes;
