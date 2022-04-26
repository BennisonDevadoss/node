import { SigninAttributes } from "../types/user";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import * as UserService from "../services/user.service";
// import { RelationshipType } from "sequelize/types/errors/database/foreign-key-constraint-error";

type CreateBody = { user: SigninAttributes };
function signin(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
  const attributes = (body as CreateBody).user;
  UserService.signin(attributes)
    .then(() => {
      reply.code(200).send({ message: "OTP sent to your mail" });
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export { signin };
