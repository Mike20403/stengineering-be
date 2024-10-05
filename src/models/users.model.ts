import { ObjectId } from 'mongodb';

export interface IUser {
	_id: ObjectId;
	deleted: boolean;
	email: string;
	firstName: string;
	lastName: string;
	password?: string;
}

export default class User implements IUser {
	_id: ObjectId;
	deleted: boolean;
	email: string;
	firstName: string;
	lastName: string;
	password?: string;

	constructor(user: IUser) {
		this._id = user._id || new ObjectId();
		this.deleted = user.deleted;
		this.email = user.email;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.password = user.password;
	}
}
