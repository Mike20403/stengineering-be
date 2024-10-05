import { Request, Response } from 'express';
import { MessageFactory } from '~/constants/messages';
import kanbanService from '~/services/kanban.services';

// Controller to add a new stage
export const addStageController = async (req: Request, res: Response) => {
	const stage = await kanbanService.addStage(req.body);

	res.json({
		message: MessageFactory('Stage', 'CREATE_SUCCESS'),
		data: stage,
	});
};

export const updateStageOrderController = async (req: Request, res: Response) => {
	const { stageOrder } = req.body;
	const updatedStages = await kanbanService.updateStageOrder(stageOrder);
	res.json({
		message: MessageFactory('Stage', 'UPDATE_SUCCESS'),
		data: updatedStages,
	});
};

// Controller to get all stages
export const getStagesController = async (req: Request, res: Response) => {
	const stages = await kanbanService.getStages();
	res.json({
		message: MessageFactory('Stage', 'GET_SUCCESS'),
		data: stages,
	});
};

// Controller to add a new ticket to a stage
export const addTicketController = async (req: Request, res: Response) => {
	const ticket = await kanbanService.addTicket(req.body);
	res.json({
		message: MessageFactory('Ticket', 'CREATE_SUCCESS'),
		data: ticket,
	});
};

// Controller to get all tickets (optionally by stage)
export const getTicketsController = async (req: Request, res: Response) => {
	const { stageId } = req.query;
	const tickets = await kanbanService.getTickets(stageId as string);
	res.json({
		message: MessageFactory('Ticket', 'GET_SUCCESS'),
		data: tickets,
	});
};

// Controller to update an existing ticket
export const updateTicketController = async (req: Request, res: Response) => {
	const { ticketId } = req.params;
	const updatedTicket = await kanbanService.updateTicket(ticketId, req.body);

	if (!updatedTicket) {
		res.status(404).json({
			message: MessageFactory('Ticket', 'NOT_FOUND'),
		});
	} else {
		res.status(200).json({
			message: MessageFactory('Ticket', 'UPDATE_SUCCESS'),
			data: updatedTicket,
		});
	}
};

// Controller to delete a ticket
export const deleteTicketController = async (req: Request, res: Response) => {
	const { ticketId } = req.params;
	const deletedTicket = await kanbanService.deleteTicket(ticketId);
	if (!deletedTicket) {
		res.status(404).json({
			message: MessageFactory('Ticket', 'NOT_FOUND'),
		});
	} else {
		res.status(200).json({
			message: MessageFactory('Ticket', 'DELETE_SUCCESS'),
			data: deletedTicket,
		});
	}
};

// Controller to move stage (drag-and-drop)
export const moveStageController = async (req: Request, res: Response) => {
	const { stageOrder } = req.body;
	const movedStage = await kanbanService.updateStageOrder(stageOrder);
	if (!movedStage?.length) {
		res.status(404).json({
			message: MessageFactory('Stage', 'NOT_FOUND'),
		});
	} else {
		res.status(200).json({
			message: MessageFactory('Stage', 'UPDATE_SUCCESS'),
			data: movedStage,
		});
	}
};

// Controller to move a ticket (drag-and-drop)
export const moveTicketController = async (req: Request, res: Response) => {
	const { ticketId } = req.params;
	const { newStageId, previousTicketId, nextTicketId } = req.body;

	const movedTicket = await kanbanService.moveTicket(ticketId, newStageId, previousTicketId, nextTicketId);

	if (!movedTicket) {
		res.status(404).json({
			message: MessageFactory('Ticket', 'NOT_FOUND'),
		});
	} else {
		res.status(200).json({
			message: MessageFactory('Ticket', 'UPDATE_SUCCESS'),
			data: movedTicket,
		});
	}
};
