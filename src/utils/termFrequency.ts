export interface ITermFrequency {
	term: string | any;
	[docId: string]: number;
}

const TermFrequency = (props: string[][]) => {
	const termFrequency: ITermFrequency[] = [];

	// Iterate over the documents
	for (let i = 0; i < props.length; i++) {
		for (let j = 0; j < props[i].length; j++) {
			if (termFrequency.some((term) => term.term === props[i][j])) {
				const index = termFrequency.findIndex(
					(term) => term.term === props[i][j]
				);
				if (!termFrequency[index][`d${i + 1}`]) {
					termFrequency[index][`d${i + 1}`] = 1;
				} else {
					termFrequency[index][`d${i + 1}`]++;
				}
			} else {
				const term = {
					term: props[i][j],
					[`d${i + 1}`]: 1,
					// eslint-disable-next-line prettier/prettier
				} as ITermFrequency;
				termFrequency.push(term);
			}
		}
	}
	termFrequency.forEach((term) => {
		for (let i = 1; i <= props.length; i++) {
			if (!term[`d${i}`]) {
				term[`d${i}`] = 0;
			}
		}
	});

	// sort by alphabet and docId
	for (let i = 0; i < termFrequency.length - 1; i++) {
		for (let j = i + 1; j < termFrequency.length; j++) {
			if (termFrequency[i].term > termFrequency[j].term) {
				const temp = termFrequency[i];
				termFrequency[i] = termFrequency[j];
				termFrequency[j] = temp;
			}
		}
	}

	return termFrequency;
};

export default TermFrequency;
