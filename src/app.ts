import express, { Request, Response } from 'express';
import { PositionalIndex } from './utils/positionalIndex';

export const app = express();

app.use(express.json());

app.get('/healthz', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'OK',
	});
});

app.get('/positionalIndex', (req: Request, res: Response) => {
	const positionalIndex = new PositionalIndex();
	positionalIndex.buildIndexFromDirectory();
	// use {"search":"Your search"} in body

	const searchResult = positionalIndex.search(req.body.search);
	console.log(searchResult);
	res.status(200).json(searchResult);
});
