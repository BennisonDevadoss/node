import { FastifyInstance } from 'fastify'
import { UserInstance } from '../models/users'
import deviceRoutes from './device.routes'

declare module 'fastify' {
    interface FastifyRequest {  // I have a doubts on this method
        currentUser: UserInstance
    }
}

function privateRoutes(
    fastify: FastifyInstance,
    opts,
    next: (err?: Error) => void
) {
    // userAuthHooks(fastify);
}
// function privateRoutes(fastify: FastifyInstance, opts: )