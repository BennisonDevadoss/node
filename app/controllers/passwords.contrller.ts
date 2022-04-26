import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

type ResetPasswordBody = {user: Rese}
function resetPasswordLink(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
//   generateResetPasswordLink(resendAttributes)
//     .then(() => {
//       reply
//         .code(200)
//         .send({ message: "Reset password link sent to your mail" });
//     })
//     .catch((error: FastifyError) => {
//       reply.send(error);
//     });
}




function reset(req: FastifyRequest, reply: FastifyReply) {
    const {body}  = req; 
    const resetPasswordAttributes = (body as ResetPasswordBody)
}