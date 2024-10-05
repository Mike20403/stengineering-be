import { Router } from 'express';
import {
	addStageController,
	getStagesController,
	addTicketController,
	getTicketsController,
	updateTicketController,
	deleteTicketController,
	moveTicketController,
	updateStageOrderController,
} from '~/controllers/kanban.controllers'; // Import the controllers
import { wrapRequestHandler } from '~/utils/handlers'; // A utility to wrap request handlers for error handling

const kanbanRouter = Router();

// Stage routes
kanbanRouter.post('/stages', wrapRequestHandler(addStageController));
kanbanRouter.get('/stages', wrapRequestHandler(getStagesController));

// Ticket routes
kanbanRouter.post('/tickets', wrapRequestHandler(addTicketController));
kanbanRouter.get('/tickets', wrapRequestHandler(getTicketsController)); // Can pass stageId as query param
kanbanRouter.put('/tickets/:ticketId', wrapRequestHandler(updateTicketController));
kanbanRouter.delete('/tickets/:ticketId', wrapRequestHandler(deleteTicketController));

// New route for moving a ticket (drag-and-drop)
kanbanRouter.put('/tickets/:ticketId/move', wrapRequestHandler(moveTicketController));
kanbanRouter.put('/stages', wrapRequestHandler(updateStageOrderController));

export default kanbanRouter;
