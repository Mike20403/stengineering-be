import { config } from 'dotenv';
import { Collection, Db, MongoClient } from 'mongodb';
import { IStage } from '~/models/stages.model';
import { ITicket } from '~/models/ticket.model';
import User from '~/models/users.model';

config();

class DatabaseService {
	private client: MongoClient;
	private db: Db;
	constructor() {
		this.client = new MongoClient(process.env.MONGODB_CONNECTION_STRING as string);
		this.db = this.client.db(process.env.MONGODB_KANBAN_DB as string);
	}

	async connect() {
		try {
			await this.db.command({ ping: 1 });
			console.log('Pinged your deployment. You successfully connected to MongoDB!');
		} catch (error) {
			console.log('Error', error);
			throw error;
		}
	}

	get users(): Collection<User> {
		return this.db.collection(process.env.MONGODB_USER_COLLECTION as string);
	}

	get stages(): Collection<IStage> {
		return this.db.collection(process.env.MONGODB_STAGE_COLLECTION as string);
	}

	get tickets(): Collection<ITicket> {
		return this.db.collection(process.env.MONGODB_TICKET_COLLECTION as string);
	}
}

const databaseService = new DatabaseService();
export default databaseService;
