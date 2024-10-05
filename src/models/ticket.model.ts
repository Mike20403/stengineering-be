import mongoose, { Schema, Document } from 'mongoose';
import { IStage } from './stages.model';
import { ObjectId } from 'mongodb';

// Interface for the Ticket
export interface ITicket extends Document {
	title: string; // Title of the ticket
	content?: string;
	description?: string; // Description of the task/issue
	status: IStage['_id']; // Reference to the Stage it belongs to
	assignee?: string; // Optional assignee (name or user ID)
	dueDate?: Date; // Optional due date
	createdAt?: Date;
	priority?: string;
	previousId: ITicket['_id'] | null; // Reference to the previous ticket in the list
	nextId: ITicket['_id'] | null; // Reference to the next ticket in the listte; // When the ticket was created
}

// Ticket Schema
const TicketSchema: Schema = new Schema({
	title: { type: String, required: true },
	content: { type: String },
	description: { type: String },
	status: { type: Schema.Types.ObjectId, ref: 'Stage', required: true },
	assignee: { type: String },
	priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
	dueDate: { type: Date },
	previousId: { type: Schema.Types.ObjectId, ref: 'Ticket' },
	nextId: { type: Schema.Types.ObjectId, ref: 'Ticket' },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITicket>('Ticket', TicketSchema);
