
import User from '~/models/users.model';
import { CreateUserReqBody, UpdateUserReqBody } from '~/models/User.requests';
import { ObjectId } from 'mongodb';
import databaseService from '~/services/database.services';
import { hashPassword } from '~/utils/crypto';

class UsersService {

	public async addUser(user: CreateUserReqBody): Promise<User> {
		const user_id = new ObjectId();

		const result = await databaseService.users.insertOne(
			new User({
				...user,
				_id: user_id,
				password: hashPassword(user.password)
			})
		)

		const insertedDocument = await databaseService.users.findOne({ _id: result.insertedId });

		delete insertedDocument?.password;

		if (!insertedDocument) {
			throw new Error('User not found');
		}

		return insertedDocument;
	}

	public async getUsers(): Promise<User[]> {
		const users = await databaseService.users.find({}).toArray();
		return users.map(user => {
			delete user.password;
			return user;
		});
	}

	public async getUser(user_id: string) {
		const user = await databaseService.users.findOne(
			{ _id: new ObjectId(user_id) },
			{
				projection: {
					password: 0,
					email_verify_token: 0,
					forgot_password_token: 0
				}
			}
		)

		if (!user) {
			throw new Error('User not found');
		}

		delete user.password;

		return user;
	}

	public async updateUser(userId: string, user: UpdateUserReqBody): Promise<User> {
		if (user.password) {
			user.password = hashPassword(user.password);
		}

		const result = await databaseService.users.findOneAndUpdate(
			{ _id: new ObjectId(userId) },
			{ $set: user },
			{ returnDocument: 'after' }
		);

		if (!result) {
			throw new Error('User not found');
		}
		delete result?.password;
		return result;
	}

	public async deleteUser(userId: string) {
		const result = await databaseService.users.findOneAndDelete({ _id: new ObjectId(userId) });

		if (!result) {
			throw new Error('User not found');
		}

		delete result.password;
		return result;
	}
}

const usersService = new UsersService();
export default usersService;
