import { ITermFrequency } from './termFrequency';

const TfWeight = (props: ITermFrequency[]): ITermFrequency[] => {
	const tfWeight: ITermFrequency[] = [];

	for (let i = 0; i < props.length; i++) {
		const tfWeightObj = {
			term: props[i].term,
		};
		for (const key in props[i]) {
			if (key !== 'term') {
				if (props[i][key] === 0) {
					tfWeightObj[key] = 0;
				} else {
					tfWeightObj[key] = 1 + Math.log10(props[i][key]);
				}
			}
		}
		tfWeight.push(tfWeightObj);
	}

	// sort by alphabet
	for (let i = 0; i < tfWeight.length - 1; i++) {
		for (let j = i + 1; j < tfWeight.length; j++) {
			if (tfWeight[i].term > tfWeight[j].term) {
				const temp = tfWeight[i];
				tfWeight[i] = tfWeight[j];
				tfWeight[j] = temp;
			}
		}
	}
	return tfWeight;
};

export default TfWeight;
