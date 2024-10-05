import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

// Interface for the Stage
export interface IStage extends Document {
	_id: ObjectId;
	name: string; // Name of the stage (e.g., "To Do", "In Progress", "Done")
	description?: string; // Optional description
	order: number; // To maintain the order of stages on the board
}

// Stage Schema
const StageSchema: Schema = new Schema({
	// _id: { type: ObjectId, required: true },
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	order: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<IStage>('Stage', StageSchema);
