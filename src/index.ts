import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { defaultErrorHandler } from '~/middlewares/error.middlewares';
import kanbanRouter from './routes/kanban.routes';
import mongooseDBService from './services/mongoose-db.services';

mongooseDBService.connectDB();

const app = express();
const port = 4000;

// Middleware for parsing JSON bodies
app.use(express.json());

const corsOptions: CorsOptions = {
	origin: '*',
};

app.use(cors(corsOptions));

// Routes
app.use('/', kanbanRouter);

// Error handling middleware
app.use(defaultErrorHandler);

// Root route
app.get('/', (req: Request, res: Response) => {
	res.send('Hello, TypeScript with Express!');
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
