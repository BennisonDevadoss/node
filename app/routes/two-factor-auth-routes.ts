import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import * as TwoFactorAuthController from "../controllers/two-factor-auth-controller";

function twoFactorAuth(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: any,
  next: (err?: Error) => void
) {
  fastify.post("/verify_otp", TwoFactorAuthController.verify);
  // fastify.post('/resent_otp', TwoFactorAuthController.resend);
  next();
}

export default twoFactorAuth;
