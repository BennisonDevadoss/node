import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import * as PasswordController from "../controllers/passwords.contrller";
import { resetPasswordSchema, sendOtpSchema } from "./password.schema";

function password(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: any,
  next: (err?: Error) => void
) {
  fastify.put(
    "/password/reset_link/send",
    sendOtpSchema,
    PasswordController.resetPasswordLink
  );
  fastify.put("/password/reset", resetPasswordSchema, PasswordController.reset);
  next();
}

export default password;
