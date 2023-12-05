/* eslint-disable for-direction */
import { ITermFrequency } from './termFrequency';

export interface IDfAndIdf {
	term: string;
	df: number;
	idf: number;
}

const DfAndIdf = (props: ITermFrequency[], N: number): IDfAndIdf[] => {
	const dfAndIdf: IDfAndIdf[] = [];
	for (let i = 0; i < props.length; i++) {
		let count = 0;
		for (const key in props[i]) {
			if (props[i][key] === 1) {
				count += 1;
			}
		}
		const dfAndIdfObj = {
			term: props[i].term,
			df: count,

			idf: Math.log10(N / (count * 1.0)),
		};
		dfAndIdf.push(dfAndIdfObj);
	}

	// sort by alphabet
	// for (let i = 0; i < dfAndIdf.length - 1; i++) {
	// 	for (let j = i + 1; j < dfAndIdf.length; j++) {
	// 		if (dfAndIdf[i].term > dfAndIdf[j].term) {
	// 			const temp = dfAndIdf[i];
	// 			dfAndIdf[i] = dfAndIdf[j];
	// 			dfAndIdf[j] = temp;
	// 		}
	// 	}
	// }

	return dfAndIdf;
};

export default DfAndIdf;
