import { Request, Response } from 'express';
import fs from 'fs';
import { app } from './app';
import { PositionalIndex } from './utils/positionalIndex';
import Stemming from './utils/stemming';
import Tokenization from './utils/tokenization';

app.use(express.json());
// read collection
const collection = fs
	.readdirSync('./collection')
	.sort((a, b) => parseInt(a) - parseInt(b));

console.log(collection);

// test a query with tokenization and stemming
Tokenization('fools fear in rush to tread where').forEach((token) => {
	console.log(Stemming(token));
});

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
