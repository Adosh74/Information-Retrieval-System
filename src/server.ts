import colors from 'colors';
import fs from 'fs';
import { app } from './app';
import DfAndIdf from './utils/dfAndIdf';
import createPositionalIndex from './utils/positionalIndex';
import searchPhrase from './utils/searchPhrase';
import Stemming from './utils/stemming';
import TermFrequency from './utils/termFrequency';
import TfIdf from './utils/tfIdf';
import TfWeight from './utils/tfWeight';
import Tokenization from './utils/tokenization';

// eslint-disable-next-line prefer-const
const words: string[][] = [[]];
const fileTerms: string[][] = [[]];
// read collection
fs.readdirSync('./collection')
	.sort((a, b) => parseInt(a) - parseInt(b))
	.forEach((fileName) => {
		const fileContent: string = fs.readFileSync(
			`${process.cwd()}/collection/${fileName}`,
			'utf-8'
		);
		words.push(fileContent.split(' '));
		// eslint-disable-next-line prefer-const
		let fileTermsArr: string[] = [];
		// tokenization and stemming
		Tokenization(fileContent).forEach((token) => {
			fileTermsArr.push(Stemming(token));
		});
		fileTerms.push(fileTermsArr);
	});

fileTerms.shift();
words.shift();
// console.log(fileTerms);

// create query and search it
// const query = 'antony brutus';
// const normalizedQuery = Tokenization(query.toLowerCase()).map((token) => {
// 	return Stemming(token);
// });

// console.log(searchPhrase(createPositionalIndex(fileTerms), normalizedQuery));

// test a query with tokenization and stemming

// *** test term frequency ***
const termFrequency = TermFrequency(words);
// const transformedTermFrequency = termFrequency.reduce((acc, { term, ...x }) => {
// 	acc[term] = x;
// 	return acc;
// }, {});
console.log(
	colors.bold.bgCyan(
		'============================================================ Term Frequency(TF) ============================================================'
	)
);

console.table(termFrequency);

// *** test tfWeight ***
const tfWeight = TfWeight(termFrequency);

console.log(
	colors.bold.bgMagenta(
		'============================================================ weight tf(1+ log tf) ============================================================'
	)
);
console.table(tfWeight);

// *** test df-idf ***
console.log(
	colors.bold.bgGreen(
		'============================================================ DF And IDF ============================================================'
	)
);
const dfAndIdf = DfAndIdf(termFrequency, words.length);
console.table(dfAndIdf);

// *** test Tf-Idf *** //
console.log(
	colors.bold.bgYellow(
		'============================================================ TF-IDF ============================================================'
	)
);

const tfIdf = TfIdf(termFrequency, dfAndIdf);
console.table(tfIdf);
app.listen(3001, () => {
	console.log('Server started on port 3001');
});
