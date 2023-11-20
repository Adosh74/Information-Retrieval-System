import fs from 'fs';
import { app } from './app';
import Stemming from './utils/stemming';
import Tokenization from './utils/tokenization';

const collection = fs
	.readdirSync('./collection')
	.sort((a, b) => parseInt(a) - parseInt(b));

console.log(collection);

Tokenization('fools fear in rush to tread where').forEach((token) => {
	console.log(Stemming(token));
});

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
