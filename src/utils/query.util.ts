import { positionalIndex } from '../server';
import { normalizedTfIdf } from '../server';

interface ISimilarityQuery {
	term: string | any;
	tf_row: number;
	w_tf: number;
	idf: number;
	tf_idf: number;
	normalized_tf_idf: number;
	[docId: string]: number;
}
const SimilarityQuery = (query: string[], documents: string[]) => {
	const similarityTable: ISimilarityQuery[] = [];
	const result: string[] = [];

	let sumIdf = 0;
	for (let i = 0; i < query.length; i++) {
		const term = query[i];

		// define tf_row
		const tf_row = !positionalIndex[term] ? 0 : 1;

		// define w_tf
		const w_tf = tf_row === 0 ? 0 : 1 + Math.log10(tf_row);

		// define idf
		const idf = !positionalIndex[term]
			? 0
			: Math.log10(10 / positionalIndex[term].docCount);

		// define tf_idf
		const tf_idf = w_tf * idf;

		sumIdf += idf ** 2;

		const newSimilarityQuery: ISimilarityQuery = {
			term,
			tf_row,
			w_tf,
			idf,
			tf_idf,
			normalized_tf_idf: 0,
		};

		similarityTable.push(newSimilarityQuery);
	}

	// define normalized_tf_idf
	similarityTable.forEach((row) => {
		row.normalized_tf_idf = row.tf_idf / Math.sqrt(sumIdf);
		for (let j = 0; j < documents.length; j++) {
			const doc = documents[j];
			row[doc] = computeSimilarity(row.term, doc) * row.normalized_tf_idf;
		}
	});
	console.log('query length', Math.sqrt(sumIdf));

	console.table(similarityTable);

	// compute sum document similarity and rank it
	for (let i = 0; i < documents.length; i++) {
		let sum = 0;
		similarityTable.forEach((row) => {
			sum += row[documents[i]];
		});
		result.push(`${documents[i]}: ${sum}`);
	}

	// sort result
	result.sort((a, b) => {
		return +b.split(':')[1] - +a.split(':')[1];
	});
	console.table(result);

	const finalResult = result.map((doc) => {
		return doc.split(':')[0];
	});

	return finalResult;
};

// ***  computing similarity
const computeSimilarity = (term: string, docs: string) => {
	let normalizedDoc = 0;
	const doc = docs;

	normalizedTfIdf.forEach((row) => {
		if (row.term === term) {
			normalizedDoc = row[doc];
		}
	});

	return normalizedDoc;
};

export default SimilarityQuery;
