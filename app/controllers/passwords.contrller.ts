import { ResendOtpAttributes, resetPasswordAttributes } from "../types/user";
import * as passwordService from "../services/password.service";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { verifyTempToken } from "../lib/jwt-handler";

type ResetPasswordBody = { user: resetPasswordAttributes };
type ResendOtpBody = { user: ResendOtpAttributes };

function resetPasswordLink(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
  const resendAttributes = (body as ResendOtpBody).user;
  passwordService
    .generateResetPasswordLink(resendAttributes)
    .then(() => {
      reply
        .code(200)
        .send({ message: "Reset password link sent to your mail" });
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function reset(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
  const resetPasswordAttributes = (body as ResetPasswordBody).user;
  verifyTempToken(resetPasswordAttributes.password_token)
    .then((authData: any) => {
      console.log("Auth data is, when reset the password", authData);
      resetPasswordAttributes.userId = authData.userId;
      return passwordService
        .resetPassword(resetPasswordAttributes)
        .then((user) => {
          console.log("user is", user);
          reply
            .code(200)
            .send({ message: "Password has been reset successfully" });
        })
        .catch((error) => {
          reply.send(error);
        });
    })
    .catch(() => {
      const error = {
        errors: ["Your session has been expired"],
      };
      reply.code(401).send(error);
    });
}

export { reset, resetPasswordLink };
