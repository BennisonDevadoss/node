import { verifyToken } from "../lib/jwt-handler";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Op } from "sequelize";
import db from "../models";

const { JWT_SECRET_KEY = "" } = process.env;

console.log("JWT_SECRET_KEY", JWT_SECRET_KEY);

const { User } = db;
console.log("user is ", User);

function getToken(headers: any) {
  const bearerHeader = headers.authorization;
  const bearer = bearerHeader ? bearerHeader.split(" ") : [];
  const bearerToken = bearer[1];
  return bearerToken;
}

const authenticate = (fastify: FastifyInstance) => {
  fastify.decorateRequest("currentUser", null);
  fastify.addHook(
    "preHandler",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = getToken(req.headers);
      if (!token) {
        const error = {
          errors: ["You need to siginin before accessing this page"],
        };
        reply.code(401).send(error);
      } else {
        await verifyToken(token, JWT_SECRET_KEY)
          .then(async (authData: any) => {
            console.log("is This function working"); //
            console.log("auth data", authData.email);
            // const user = await User.findone({
            //   where: { email: authData.email },
            // });
            //, confirmed_at: { [Op.ne]: null }

            const user = await User.findOne({
              where: { email: authData.email, confirmed_at: { [Op.ne]: null } },
            });
            //   include: {
            //     model: Organization,
            //     as: "organization",
            //   },
            
            console.log("is user variable have user --> ", user);
            if (user) {
              req.currentUser = user;
              reply.header("Authorization", `Bearer ${token}`);
            } else {
              const error = {
                errors: ["Your session has expired"],
              };
              reply.code(401).send(error);
            }
          })
          .catch(() => {
            const error = {
              errors: ["Your session has expired"],
            };
            reply.code(401).send(error);
          });
      }
    }
  );
};

export default authenticate;
