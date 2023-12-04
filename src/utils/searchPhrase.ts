import { PositionalIndex } from './positionalIndex';

const searchPhrase = (index: PositionalIndex, terms: string[]): string[] => {
	const phraseDocs: string[] = [];

	// Get the positions for the first term in the phrase
	const firstTermPositions = index[terms[0]]?.positions;

	if (firstTermPositions) {
		// Iterate over the documents where the first term appears
		for (const docId in firstTermPositions) {
			const docPositions = firstTermPositions[docId];

			// Check if the subsequent terms appear in the same document and adjacent positions
			let isPhraseMatch = true;
			for (let i = 1; i < terms.length; i++) {
				const term = terms[i];
				const termPositions = index[term]?.positions[docId];

				if (!termPositions) {
					isPhraseMatch = false;
					break;
				}

				// Check if the positions of the current term are adjacent to the previous term
				const prevTermPositions =
					i === 1 ? docPositions : index[terms[i - 1]].positions[docId];
				if (!prevTermPositions.some((pos) => termPositions.includes(pos + 1))) {
					isPhraseMatch = false;
					break;
				}
			}

			// If all terms appear in the same document as a phrase, add the document ID to the results
			if (isPhraseMatch) {
				phraseDocs.push(docId);
			}
		}
	}

	return phraseDocs;
};

export default searchPhrase;
