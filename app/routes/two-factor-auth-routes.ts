import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import * as TwoFactorAuthController from "../controllers/two-factor-auth-controller";
import { verifyOtpSchema } from "./two-factor-auth-schema";

function twoFactorAuth(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: any,
  next: (err?: Error) => void
) {
  fastify.post("/verify_otp", verifyOtpSchema, TwoFactorAuthController.verify);
  fastify.post("/resend_otp", TwoFactorAuthController.resend);
  next();
}

export default twoFactorAuth;
