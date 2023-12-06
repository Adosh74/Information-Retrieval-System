import { ITermFrequency } from './termFrequency';

interface IDocumentLength {
	docName: string;
	docLength: number;
}

const DocumentLength = (tfIdf: ITermFrequency[], N: number): IDocumentLength[] => {
	const documentLength: IDocumentLength[] = [];

	for (let i = 1; i <= N; i++) {
		let sum = 0;

		for (let j = 0; j < tfIdf.length; j++) {
			sum += Math.pow(tfIdf[j][`d${i}`], 2);
			// sum += tfIdf[j][`d${i}`];
		}
		const docLen = Math.sqrt(sum);
		const newDocLenList: IDocumentLength = {
			docName: `d${i}`,
			docLength: docLen,
		};

		documentLength.push(newDocLenList);
	}

	return documentLength;
};

export default DocumentLength;
