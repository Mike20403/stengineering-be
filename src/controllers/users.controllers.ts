import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Parser } from 'json2csv';
import { USERS_MESSAGES } from '~/constants/messages';
import { CreateUserReqBody, GetProfileReqParams } from '~/models/User.requests';
import usersService from '~/services/users.services';


export const signupUserController = async (
    req: Request<ParamsDictionary, any, CreateUserReqBody>,
    res: Response,
) => {

    const user = await usersService.addUser({...req.body});
   
    return res.json({
        message: USERS_MESSAGES.CREATE_USER_SUCCESS,
		data: user
    });
};

export const getUsersController = async (
	req: Request,
	res: Response,
) => {
	const users = await usersService.getUsers();
	return res.json(users);
}

export const getProfileController = async (req: Request<GetProfileReqParams>, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const user = await usersService.getUser(id);
	return res.json({
		message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
		data: user
	})
}

export const updateUserController = async (
	req: Request<GetProfileReqParams>, res: Response, next: NextFunction
) => {
	const { id } = req.params;
	const users = await usersService.updateUser(id, req.body);
	return res.json(users);
}

export const deleteUserController = async (
	req: Request<GetProfileReqParams>, res: Response, next: NextFunction
) => {
	const { id } = req.params;
	const users = await usersService.deleteUser(id);
	return res.json(users);
}

export const exportUsersToCsv = async (
	req: Request, res: Response, next: NextFunction
) => {
	const users = await usersService.getUsers();
	const json2csv = new Parser();
	const csv = json2csv.parse(users);
	res.setHeader('Content-Type', 'text/csv');
	res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
	res.send(csv);
}
