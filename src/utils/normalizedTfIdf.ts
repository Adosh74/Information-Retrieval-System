import { IDocumentLength } from './documentLength';
import { ITermFrequency } from './termFrequency';

const NormalizedTfIdf = (
	tfIdf: ITermFrequency[],
	docLength: IDocumentLength[]
): ITermFrequency[] => {
	const normalizedTfIdf: ITermFrequency[] = tfIdf;

	for (let i = 0; i < docLength.length; i++) {
		for (let j = 0; j < normalizedTfIdf.length; j++) {
			if (normalizedTfIdf[j][`d${i + 1}`])
				normalizedTfIdf[j][`d${i + 1}`] =
					normalizedTfIdf[j][`d${i + 1}`] / docLength[i].docLength;
		}
	}
	return normalizedTfIdf;
};

export default NormalizedTfIdf;
