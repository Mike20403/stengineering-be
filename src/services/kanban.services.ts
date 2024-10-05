import Stage, { IStage } from '~/models/stages.model';
import { ObjectId } from 'mongodb';
import Ticket, { ITicket } from '~/models/ticket.model';
import mongooseDBService from './mongoose-db.services';

class KanbanService {
	// Add a new stage
	public async addStage(stageData: Partial<IStage>): Promise<IStage> {
		const stage_id = new ObjectId();
		const stage = new Stage({ ...stageData, _id: stage_id });
		const result = await stage.save();
		return result;
	}

	// Get all stages
	public async getStages(): Promise<IStage[]> {
		const stages = await Stage.find().sort({ order: 1 }).exec(); // Sort by 'order'
		return stages;
	}

	// Add a new ticket to a stage
	public async addTicket(ticketData: Partial<ITicket>): Promise<ITicket> {
		const ticket = new Ticket({
			...ticketData,
		});
		await ticket.save();
		// Update the neighboring tickets in the same stage
		if (ticket.previousId) {
			const previousTicket = await Ticket.findById(ticket.previousId).exec();
			if (previousTicket) {
				previousTicket.nextId = ticket._id;
				await previousTicket.save();
			}
		}
		return ticket;
	}

	// Get all tickets (optionally by stage)
	public async getTickets(stageId?: string): Promise<ITicket[]> {
		let query = {};
		if (stageId) {
			query = { status: new ObjectId(stageId) }; // Filter by stage
		}
		const tickets = await Ticket.find(query).exec();
		return tickets;
	}

	// Move a ticket to a different stage or reorder within the same stage
	public async moveTicket(
		ticketId: string,
		newStageId: string,
		previousTicketId?: string,
		nextTicketId?: string,
	): Promise<ITicket | null> {
		const ticketToMove = await Ticket.findById(ticketId).exec();

		if (!ticketToMove) {
			throw new Error('Ticket not found');
		}

		// Step 0: Update the neighboring tickets in the current stage
		if (ticketToMove.previousId) {
			const previousTicket = await Ticket.findById(ticketToMove.previousId).exec();
			if (previousTicket) {
				previousTicket.nextId = ticketToMove.nextId;
				await previousTicket.save();
			}
		}
		if (ticketToMove.nextId) {
			const nextTicket = await Ticket.findById(ticketToMove.nextId).exec();
			if (nextTicket) {
				nextTicket.previousId = ticketToMove.previousId;
				await nextTicket.save();
			}
		}

		// Step 1: Update the neighboring tickets in the target stage
		if (previousTicketId) {
			const previousTicket = await Ticket.findById(previousTicketId).exec();
			if (previousTicket) {
				previousTicket.nextId = ticketToMove._id;
				await previousTicket.save();
			}
		}

		if (nextTicketId) {
			const nextTicket = await Ticket.findById(nextTicketId).exec();
			if (nextTicket) {
				nextTicket.previousId = ticketToMove._id;
				await nextTicket.save();
			}
		}

		// Step 2: Update the ticket's stage and neighbors
		ticketToMove.status = new ObjectId(newStageId);
		ticketToMove.previousId = previousTicketId ? new ObjectId(previousTicketId) : null;
		ticketToMove.nextId = nextTicketId ? new ObjectId(nextTicketId) : null;

		await ticketToMove.save();

		return ticketToMove;
	}

	// Update an existing ticket (e.g., title, description, etc.)
	public async updateTicket(ticketId: string, ticketData: Partial<ITicket>): Promise<ITicket | null> {
		const updatedTicket = await Ticket.findByIdAndUpdate(
			new ObjectId(ticketId),
			{ $set: ticketData },
			{ new: true },
		)
			.populate('status')
			.exec(); // Return the updated document
		return updatedTicket;
	}

	// Delete a ticket
	public async deleteTicket(ticketId: string): Promise<ITicket | null> {
		const deletedTicket = await Ticket.findByIdAndDelete(new ObjectId(ticketId)).exec();
		return deletedTicket;
	}

	public async updateStageOrder(stageOrder: string[]): Promise<IStage[]> {
		try {
			// Create bulk operations
			const bulkOperations = stageOrder.map((stageId, index) => {
				return {
					updateOne: {
						filter: { _id: new mongooseDBService.mongooseInstance.Types.ObjectId(stageId) }, // Use ObjectId type for _id
						update: { $set: { order: index } }, // Set the order field
					},
				};
			});

			// Execute bulk operations in one go
			await Stage.bulkWrite(bulkOperations);

			// Return the updated stages (you might need to fetch them again if you need updated data)
			const updatedStages = await Stage.find({ _id: { $in: stageOrder } }).exec();
			return updatedStages;
		} catch (error) {
			console.error('Error updating stage order:', error);
			throw new Error('Failed to update stage order');
		}
	}
}

const kanbanService = new KanbanService();
export default kanbanService;
