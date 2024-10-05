import mongoose, { Schema, Document } from 'mongoose';
import { IStage } from './stage.model';
import { ITicket } from './ticket.model';

// Interface for the Kanban Board
export interface IKanban extends Document {
	title: string; // Title of the board (e.g., "Project Kanban Board")
	stages: IStage['_id'][]; // List of stages in the Kanban board
	tickets: ITicket['_id'][]; // List of tickets associated with the board
	owner: string; // Owner of the board (e.g., user ID)
}

// Kanban Schema
const KanbanSchema: Schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	stages: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Stage',
			required: true,
		},
	],
	tickets: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Ticket',
		},
	],
	owner: {
		type: String,
		required: true,
	},
});

export default mongoose.model<IKanban>('Kanban', KanbanSchema);
