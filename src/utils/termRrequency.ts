interface ITermFrequency {
	term: string;
	[docId: string]: number | string;
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
				termFrequency[index][`d${i + 1}`] = 1;
			} else {
				const term: ITermFrequency = {
					term: props[i][j],
					[`d${i + 1}`]: 1,
				};
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

	return termFrequency;
};

export default TermFrequency;
