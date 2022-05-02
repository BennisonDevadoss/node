import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import * as UserService from '../services/user.service';
import { SigninAttributes } from '../types/user';

interface CreateBody { user: SigninAttributes; }
function signin(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
  const attributes = (body as CreateBody).user;
  UserService.signin(attributes)
    .then(() => {
      reply.code(200).send({ message: 'OTP sent to your mail' });
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function signout(req: FastifyRequest, reply: FastifyReply) {
  reply.header('Authorization', null);
  reply.send({ message: 'Signed out successfully' });
}
export { signin, signout };
