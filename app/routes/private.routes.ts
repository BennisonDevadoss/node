import { FastifyInstance } from 'fastify';
import userAuthHooks from '../hooks/user-authontication.hook';
import { UserInstance } from '../models/users';
import deviceRoutes from './device.routes';
import userRoutes from './user.routes';

declare module 'fastify' {
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
