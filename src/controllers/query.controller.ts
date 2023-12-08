import { Request, Response } from 'express';
import { positionalIndex } from '../server';
import searchPhrase from '../utils/searchPhrase';
import Stemming from '../utils/stemming';
import Tokenization from '../utils/tokenization';

export const phraseQuery = (req: Request, res: Response) => {
	let query: string = req.body.query;
	query = query.trim().toLowerCase();

	// check if contain and operator
	const containOperator = query.indexOf('and');
	let result: string[] = [];

	if (containOperator === -1) {
		const normalizedQuery: string[] = Tokenization(query).map((term) => {
			return Stemming(term);
		});
		result = searchPhrase(positionalIndex, normalizedQuery);
	} else {
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
	}

	// check if no result found
	if (result.length === 0) {
		return res.sendStatus(204);
	}

	res.status(200).send(result);
};
