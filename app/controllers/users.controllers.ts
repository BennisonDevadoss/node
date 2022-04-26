import UserPolicy from "../policies/user.policy";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserCreationAttributes } from "../types/user";
import userService from "../services/user.service";

type CreateBody = { user: UserCreationAttributes };
function create(req: FastifyRequest, reply: FastifyReply) {
  const { body, currentUser } = req;
  const attributes = (body as CreateBody).user;
  attributes.created_by = currentUser.id; // ????
  const policy = new UserPolicy(currentUser);
  if (policy.canCreate(attributes)) {
    console.log("is canCreate functon working");
    userService
      .create(attributes, currentUser)
      .then((result) => {
        reply.code(201).send(result);
      })
      .catch((error) => {
        reply.send(error);
      });
  } else {
    reply
      .code(403)
      .send({ errors: ["You are not permitted to perform this action"] });
  }
}

export { create };
