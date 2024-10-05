import { Router } from 'express';
import { deleteUserController, exportUsersToCsv, getProfileController, signupUserController, updateUserController } from '~/controllers/users.controllers';
import { signUpUserValidator } from '~/middlewares/user.middlewares';
import { wrapRequestHandler } from '~/utils/handlers';
import { getUsersController } from '~/controllers/users.controllers';

const usersRouter = Router();

usersRouter.post('/', signUpUserValidator, wrapRequestHandler(signupUserController));

usersRouter.get('/', wrapRequestHandler(getUsersController));

usersRouter.get('/:id', wrapRequestHandler(getProfileController));

usersRouter.put('/:id', wrapRequestHandler(updateUserController));

usersRouter.delete('/:id', wrapRequestHandler(deleteUserController));

usersRouter.get('/export/csv', wrapRequestHandler(exportUsersToCsv));


export default usersRouter;
