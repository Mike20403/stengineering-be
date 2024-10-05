import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema';
import HTTP_STATUS from '~/constants/http-status';
import { EntityError, ErrorWithStatus } from '~/models/errors.model';

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        await validation.run(req);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const errorsObject = errors.mapped();
        const entityError = new EntityError({ errors: {} });
        for (const key in errorsObject) {
            const { msg } = errorsObject[key];
            if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
                return next(msg);
            }
            entityError.errors[key] = errorsObject[key];
        }

        next(entityError);
    };
};
