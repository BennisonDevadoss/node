import { FastifyInstance } from "fastify";
import { UserInstance } from "../models/users";
import userRoutes from "./user.routes";
import userAuthHooks from "../hooks/user-authontication.hook";
import deviceRoutes from "./device.routes";

declare module "fastify" {
  interface FastifyRequest {
    currentUser: UserInstance;
  }
}

function privateRoutes(
  fastify: FastifyInstance,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  userAuthHooks(fastify);
  fastify.register(deviceRoutes);
  fastify.register(userRoutes);
  next();
}
export default privateRoutes;
