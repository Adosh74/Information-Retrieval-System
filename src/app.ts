import express, { Request, Response } from 'express';
import routes from './routes/index.route';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/healthz', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'OK',
	});
});
