import fs from 'fs';
import { app } from './app';
import Stemming from './utils/stemming';
import Tokenization from './utils/tokenization';

//
// read collection
fs.readdirSync('./collection')
	.sort((a, b) => parseInt(a) - parseInt(b))
	.forEach((fileName) => {
		console.log(fileName);
		const fileContent: string = fs.readFileSync(
			`${process.cwd()}/collection/${fileName}`,
			'utf-8'
		);

		Tokenization(fileContent).forEach((token) => {
			console.log(Stemming(token));
		});
	});

// test a query with tokenization and stemming

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
