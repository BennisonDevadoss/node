import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import UserPolicy from '../policies/user.policy';
import * as UserService from '../services/user.service';
import { UserCreationAttributes, UserUpdateAttributes } from '../types/user';

interface CreateBody { user: UserCreationAttributes; }
interface UpdateBody { user: UserUpdateAttributes; }
interface UserDeleteQueryParams { ids: string; }

function list(req: FastifyRequest, reply: FastifyReply) {
  const { currentUser } = req;
  const policy = new UserPolicy(currentUser);
  if (policy.canlist()) {
    UserService.list(currentUser)
      .then((users) => {
        reply.code(200).send(users);
      })
      .catch((error: FastifyError) => {
        reply.send(error);
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not permitted to perform this action'] });
  }
}

function create(req: FastifyRequest, reply: FastifyReply) {
  const { body, currentUser } = req;
  const attributes = (body as CreateBody).user;
  attributes.created_by = currentUser.id; // ????
  console.log('Current user is', currentUser);
  const policy = new UserPolicy(currentUser);

  if (policy.canCreate(attributes)) {
    console.log('is canCreate functon working');
    UserService.create(attributes, currentUser)
      .then((result) => {
        reply.code(201).send(result);
      })
      .catch((error) => {
        reply.send(error);
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not permitted to perform this action'] });
  }
}

function update(req: FastifyRequest, reply: FastifyReply) {
  const { body, params, currentUser } = req;
  const { id } = params as { id: bigint };
  const attributes = (body as UpdateBody).user;
  console.log('attributes is', attributes);
  const policy = new UserPolicy(currentUser);
  if (policy.canUpdate()) {
    UserService.update(id, attributes, currentUser)
      .then((updateduser) => {
        // UserInstance
        reply.code(200).send(updateduser);
      })
      .catch((error: FastifyError) => {
        reply.send(error);
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not permitted to perform this action'] });
  }
}

async function deleteAll(req: FastifyRequest, reply: FastifyReply) {
  const { ids } = req.query as UserDeleteQueryParams;
  console.log('ids are', ids);
  const { currentUser } = req;
  const policy = new UserPolicy(currentUser);
  if (policy.canDelete()) {
    console.log('Deletion poliy is', policy.canDelete());
    await UserService.destroy(ids, currentUser)
      .then(() => {
        reply.code(200).send({ message: 'User(s) deleted successfully' });
      })
      .catch((error: FastifyError) => {
        reply.send(error);
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not permitted to perform this action'] });
  }
}
export { create, update, deleteAll, list };
