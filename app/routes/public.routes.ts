import { FastifyInstance } from "fastify";
import sessionRoutes from "./session.routes";
import twoFactorAuthRoutes from "./two-factor-auth-routes";
function publicRoutes(
  fastify: FastifyInstance,
  opts,
  next: (err?: Error) => void
) {
  fastify.register(sessionRoutes);
  fastify.register(twoFactorAuthRoutes);
  next();
}

export default publicRoutes;
