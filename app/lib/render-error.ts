import { map } from 'lodash';
import {
    EmptyResultError,
    ValidationError,
    UniqueConstraintError,
    DatabaseError
} from 'sequelize'
import { FastifyReply, FastifyError } from 'fastify';
import AssociationValidationError from './validation-association-error-msg';

function renderError(reply: FastifyReply, errObj: FastifyError) {
    console.log('error object is', errObj)
    if (errObj.validation) {
        const messages = map(errObj.validation, (err: any) => err.message);
        reply.code(400).send({ errors: messages })
    } else if (errObj instanceof EmptyResultError) {
        reply.code(404).send({ errors: [errObj.message] });
    }
    else if (errObj instanceof ValidationError || errObj instanceof UniqueConstraintError) {
        console.log('error is ', errObj);
        console.log('errorObj.errors is', errObj.errors)
        const messages = map(errObj.errors, (error: any) => error.message)
        reply.code(422).send({ errors: messages })
    } else if (
        errObj instanceof ValidationError ||
        errObj instanceof UniqueConstraintError
    ) {
        const messages = map(errObj.errors, (error: any) => error.message);
        reply.code(422).send({ errors: messages });
    } else if (errObj instanceof DatabaseError) {
        const messages = errObj.message || errObj.original;
        reply.code(400).send({ errors: [messages] });
    } else if (errObj instanceof AssociationValidationError) {
        reply.code(422).send({ errors: [errObj.message] });
    } else if (
        errObj.statusCode &&
        errObj.statusCode >= 400 &&
        errObj.statusCode <= 499
    ) {
        reply.code(errObj.statusCode).send({ errors: [errObj.message] })
    } else {
        reply.code(500).send({
            errors: ['Sorry, something went wrong on our end. Please try again later']
        });
    }
}
export default renderError
