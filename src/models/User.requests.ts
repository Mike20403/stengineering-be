import { IUser } from '~/models/users.model'

export interface LoginReqBody {
	email: string
	password: string
}

export interface CreateUserReqBody extends Omit<IUser, '_id' | 'password'> {
	_id?: undefined;
	password: string;
};

export interface UpdateUserReqBody extends Omit<IUser, 'deleted'> {
	deleted?: undefined;
};	

export interface GetProfileReqParams {
 	id: string;
}