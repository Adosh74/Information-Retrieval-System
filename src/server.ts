import fs from 'fs';
import { app } from './app';
import createPositionalIndex from './utils/newPositionalIndex';
import searchPhrase from './utils/searchPhrase';
import Stemming from './utils/stemming';
import Tokenization from './utils/tokenization';

// eslint-disable-next-line prefer-const
let fileTerms: string[][] = [[]];
// read collection
fs.readdirSync('./collection')
	.sort((a, b) => parseInt(a) - parseInt(b))
	.forEach((fileName) => {
		const fileContent: string = fs.readFileSync(
			`${process.cwd()}/collection/${fileName}`,
			'utf-8'
		);
		// eslint-disable-next-line prefer-const
		let fileTermsArr: string[] = [];
		// tokenization and stemming
		Tokenization(fileContent).forEach((token) => {
			fileTermsArr.push(Stemming(token));
		});
		fileTerms.push(fileTermsArr);
	});

fileTerms.shift();
// console.log(fileTerms);

// create query and search it
const query = 'angels fools in rush';
const normalizedQuery = Tokenization(query.toLowerCase()).map((token) => {
	return Stemming(token);
});

console.log(searchPhrase(createPositionalIndex(fileTerms), normalizedQuery));

// test a query with tokenization and stemming

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
