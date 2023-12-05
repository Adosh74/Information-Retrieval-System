import { IDfAndIdf } from './dfAndIdf';
import { ITermFrequency } from './termFrequency';

const TfIdf = (props: ITermFrequency[], dfAndIdf: IDfAndIdf[]): ITermFrequency[] => {
	const tfIdf: ITermFrequency[] = [];
	for (let i = 0; i < props.length; i++) {
		const tfIdfObj = {
			term: props[i].term,
		};
		for (const key in props[i]) {
			if (key !== 'term') {
				tfIdfObj[key] = props[i][key] * dfAndIdf[i].idf;
			}
		}
		tfIdf.push(tfIdfObj);
	}

	return tfIdf;
};

export default TfIdf;
