import { Request, Response } from 'express';
import { positionalIndex } from '../server';
import SimilarityQuery from '../utils/query.util';
import searchPhrase from '../utils/searchPhrase';
import Stemming from '../utils/stemming';
import Tokenization from '../utils/tokenization';

export const phraseQuery = (req: Request, res: Response) => {
	let query: string = req.body.query;
	query = query.trim().toLowerCase();

	let result: string[] = [];

	if (query.includes(' and ')) {
		const phrasesQueries = query.split('and');
		const temp: string[][] = [[]];
		let anotherTemp;
		for (let i = 0; i < phrasesQueries.length; i++) {
			anotherTemp = Tokenization(phrasesQueries[i]).map((term) => {
				return Stemming(term);
			});
			temp.push(anotherTemp);
		}
		temp.shift();

		const resultTemp: string[] = [];
		for (let i = 0; i < temp.length; i++) {
			resultTemp.push(...searchPhrase(positionalIndex, temp[i]));
		}

		for (let i = 0; i < resultTemp.length - 1; i++) {
			for (let j = i + 1; j < resultTemp.length; j++) {
				if (resultTemp[i] === resultTemp[j]) {
					result.push(resultTemp[i]);
				}
			}
		}
		result = SimilarityQuery(temp.join(' ').split(',').join(' ').split(' '), result);
		// console.log(temp.join(' ').split(',').join(' ').split(' '));
	}
	// check if contain or operator
	else if (query.includes(' or ')) {
		const phrasesQueries = query.split(' or ');

		const temp: string[][] = [[]];
		console.log(phrasesQueries);

		let anotherTemp;
		for (let i = 0; i < phrasesQueries.length; i++) {
			anotherTemp = Tokenization(phrasesQueries[i]).map((term) => {
				return Stemming(term);
			});
			temp.push(anotherTemp);
		}
		temp.shift();
		console.log(temp);

		let resultTemp: string[] = [];
		for (let i = 0; i < temp.length; i++) {
			resultTemp.push(...searchPhrase(positionalIndex, temp[i]));
		}

		// remove duplicate in array
		resultTemp = [...new Set(resultTemp)];

		result = SimilarityQuery(
			temp.join(' ').split(',').join(' ').split(' '),
			resultTemp
		);
	} else if (query.includes(' not ')) {
		const phrasesQueries = query.split(' not ');

		const temp: string[][] = [[]];
		console.log(phrasesQueries);

		let anotherTemp;
		for (let i = 0; i < phrasesQueries.length; i++) {
			anotherTemp = Tokenization(phrasesQueries[i]).map((term) => {
				return Stemming(term);
			});
			temp.push(anotherTemp);
		}
		temp.shift();
		console.log(temp);

		const resultTemp: string[][] = [[]];
		for (let i = 0; i < temp.length; i++) {
			resultTemp.push(searchPhrase(positionalIndex, temp[i]));
		}
		resultTemp.shift();

		// keep only the first array and if second array contain element in the first array, remove it from the first array
		for (let i = 0; i < resultTemp[0].length; i++) {
			for (let j = 0; j < resultTemp[1].length; j++) {
				if (resultTemp[0][i] === resultTemp[1][j]) {
					resultTemp[0].splice(i, 1);
				}
			}
		}

		console.log(resultTemp);

		result = SimilarityQuery(temp[0], resultTemp[0]);
	} else {
		const normalizedQuery: string[] = Tokenization(query).map((term) => {
			return Stemming(term);
		});

		result = searchPhrase(positionalIndex, normalizedQuery);

		result = SimilarityQuery(normalizedQuery, result);
	}

	// check if no result found
	if (result.length === 0) {
		return res.sendStatus(204);
	}

	res.status(200).send(result);
};
