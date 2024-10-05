import { checkSchema } from 'express-validator';
import { validate } from '~/utils/validation';

export const signUpUserValidator = validate(
    checkSchema(
        {
            email: {
                in: ['body'],
                isEmail: {
                    errorMessage: 'Invalid email',
                },
                isString: true,
            },
            password: {
                in: ['body'],
                isLength: {
                    errorMessage: 'Password should be at least 6 chars long',
                    options: { min: 6 },
                },
                isString: true,
            },
            firstName: {
                in: ['body'],
                isLength: {
                    errorMessage: 'Name should be at least 2 chars long',
                    options: { min: 2 },
                },
                isString: true,
            },
            lastName: {
                in: ['body'],
                isLength: {
                    errorMessage: 'Name should be at least 2 chars long',
                    options: { min: 2 },
                },
                isString: true,
            },
        },
        ['body'],
    ),
);
