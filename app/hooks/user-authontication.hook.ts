import { verifyToken } from '../lib/jwt-handler';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Op } from 'sequelize'
import models from '../models'

const { JWT_SECRET_KEY = '' } = process.env

const { User, Organization } = models;

function getToken(headers: any) {
    const bearerHeader = headers.authorization;
    const bearer = bearerHeader ? bearerHeader.split(' ') : [];
    const bearerToken = bearer[1];
    return bearerToken;
}

const authenticate = (fastify: FastifyInstance) => {
    fastify.decorateRequest('currentUser', null);
    fastify.addHook('preHandler',
        async (req: FastifyRequest, reply: FastifyReply) => {
            const token = getToken(req.headers);
            if (!token) {
                const error = {
                    errors: ['You need to siginin before accessing this page']
                };
                reply.code(401).send(error);
            } else {
                await verifyToken(token, JWT_SECRET_KEY)
                    .then(async (authData: any) => {
                        const user = await User.findone({
                            where: { email: authData.email, confirmed_at: { [Op.ne]: null } },
                            include: {
                                model: Organization,
                                as: 'organization'
                            }
                        });
                        if (user) {
                            req.currentUser = user;
                            reply.header('Authorization', `Bearer ${token}`);
                        } else {
                            const error = {
                                errors: ['Your session has expired']
                            };
                            reply.code(401).send(error)
                        }
                    })
                    .catch(() => {
                        const error = {
                            errors: ['Your session has expired']
                        };
                        reply.code(401).send(error)
                    });
            }
        });
};
export default authenticate