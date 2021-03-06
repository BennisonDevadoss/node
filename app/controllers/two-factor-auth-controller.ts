import { FastifyReply, FastifyRequest, FastifyError } from "fastify";
import { generateToken } from "../lib/jwt-handler";
import { UserInstance } from "../models/users";
import * as UserService from "../services/user.service";
import { OTPVerifyAttributes, ResendOtpAttributes } from "../types/user";
import * as TwoFactorAuthService from "../services/two-factor-auth-service";
type CreateBody = {
  user: OTPVerifyAttributes;
};
type ResendOtpBody = { user: ResendOtpAttributes };

function verify(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
  const otpAttributes = (body as CreateBody).user;
  UserService.verifyOtp(otpAttributes)
    .then((user: UserInstance) => {
      console.log("is otp verified", user.is_otp_verified);
      console.log("user.current-sigin-in-at", user.current_signin_at);
      if (user.is_otp_verified) {
        const tokenParams = {
          userId: user.id,
          email: user.email,
          currentSiginInAt: user.current_signin_at,
        };

        console.log("token params is", tokenParams);
        const token = generateToken(tokenParams);
        reply.header("Authorization", `Bearer ${token}`);
        reply.code(200).send(user);
      } else {
        const error = {
          errors: ["Invalid OTP"],
        };
        reply.code(422).send(error);
      }
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function resend(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
  const resendAttributes = (body as ResendOtpBody).user;
  TwoFactorAuthService.otpResend(resendAttributes)
    .then((otp) => {
      reply.code(200).send({ otp });
    })
    .catch((error) => {
      reply.send(error);
    });
}
export { verify, resend };
