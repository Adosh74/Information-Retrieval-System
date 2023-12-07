export type PositionalIndex = {
	[term: string]: {
		docCount: number;
		positions: {
			[docId: string]: number[];
		};
	};
};

const createPositionalIndex = (documents: string[][]): PositionalIndex => {
	const positionalIndex: PositionalIndex = {};

	// Iterate over each document
	for (let docId = 0; docId < documents.length; docId++) {
		const document = documents[docId];

		// Iterate over each term in the document
		for (let position = 0; position < document.length; position++) {
			const term = document[position];

			// If the term doesn't exist in the positional index, initialize it
			if (!(term in positionalIndex)) {
				positionalIndex[term] = {
					docCount: 0,
					positions: {},
				};
			}

			// access data in positionalIndex[term]
			const termInfo = positionalIndex[term];

			// If the document doesn't exist in the term's positions, initialize it
			if (!(`d${docId + 1}` in termInfo.positions)) {
				termInfo.positions[`d${docId + 1}`] = [];
				termInfo.docCount++;
			}

			// Add the position of the term in the document
			termInfo.positions[`d${docId + 1}`].push(position);
		}
	}

	return positionalIndex;
};

export default createPositionalIndex;
