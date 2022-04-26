import { OTPVerifyAttributes } from "../types/user";
import { FastifyReply, FastifyRequest } from "fastify";
import * as UserService from "../services/user.service";
import { UserInstance } from "../models/users";
import { generateToken } from "../lib/jwt-handler";
// import User from "app/models/users";

type CreateBody = { user: OTPVerifyAttributes };
function verify(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
  const otpAttributes = (body as CreateBody).user;
  UserService.verifyOtp(otpAttributes).then((user: UserInstance) => {
    if (user.is_otp_verified) {
      const tokenParams = {
        userId: user.id,
        email: user.email,
        currentSiginInAt: user.current_signin_at,
      };
      const token = generateToken(tokenParams);
      reply.header("Authorization", `Bearer ${token}`);
      reply.code(200).send(user);
    } else {
      const error = {
        errors: ["Invalid OTP"],
      };
      reply.code(422).send(error);
    }
  });
}

export { verify };
