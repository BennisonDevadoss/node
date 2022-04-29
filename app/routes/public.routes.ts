import { FastifyInstance } from "fastify";
import sessionRoutes from "./session.routes";
import twoFactorAuthRoutes from "./two-factor-auth-routes";
import passwordRoutes from "./password.routes";
function publicRoutes(
  fastify: FastifyInstance,
  opts,
  next: (err?: Error) => void
) {
  fastify.register(sessionRoutes);
  fastify.register(twoFactorAuthRoutes);
  fastify.register(passwordRoutes);
  next();
}

export default publicRoutes;
