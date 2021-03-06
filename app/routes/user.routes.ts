import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import * as UserController from "../controllers/users.controllers";
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
  listUserSchema,
} from "./user.schema";
function users(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts,
  next: (err?: Error) => void
) {
  fastify.post("/users", createUserSchema, UserController.create);
  fastify.put("/users/:id", updateUserSchema, UserController.update);
  fastify.delete("/users", deleteUserSchema, UserController.deleteAll);
  fastify.get("/users", listUserSchema, UserController.list);
  next();
}

export default users;
