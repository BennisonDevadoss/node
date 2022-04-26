import { FastifyInstance } from "fastify";
import { ServerResponse, Server, IncomingMessage } from "http";
import * as SessionsController from "../controllers/sessions.controller";

function session(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts,
  next: (err?: Error) => void
) {
  fastify.post("/signin", SessionsController.signin);
  next();
}

export default session;
