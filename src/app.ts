import express, { Request, Response } from 'express';

export const app = express();

app.get('/healthz', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'OK',
	});
});
