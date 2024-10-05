import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
// MongoDB connection URL (replace with your own URL)
const mongoDB = process.env.MONGODB_CONNECTION_STRING as string;
// Mongoose connection
class MongooseDBService {
	private mongoose: typeof mongoose;
	constructor() {
		this.mongoose = mongoose;
	}
	get mongooseInstance() {
		return this.mongoose;
	}
	connectDB = async () => {
		try {
			await this.mongoose.connect(mongoDB);
			console.log('MongoDB connected successfully');
		} catch (error) {
			console.error('Error connecting to MongoDB:', error);
			throw error;
		}
	};
}

const mongooseDBService = new MongooseDBService();
export default mongooseDBService;
