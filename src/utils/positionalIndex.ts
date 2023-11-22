import * as fs from 'fs';
import * as path from 'path';

type DocumentIndex = { [docId: number]: number[] };

export class PositionalIndex {
	private index: { [term: string]: DocumentIndex };

	constructor() {
		this.index = {};
	}

	addTerm(term: string, docId: number, position: number): void {
		// Increment the position value by 1 to start from 1 instead of 0
		position += 1;

		if (docId === 0) {
			docId = 1;
		}

		if (!this.index[term]) {
			this.index[term] = {};
		}

		if (!this.index[term][docId]) {
			this.index[term][docId] = [];
		}

		this.index[term][docId].push(position);
	}

	search(term: string): DocumentIndex | undefined {
		return this.index[term];
	}

	buildIndexFromDirectory(directoryPath: string): void {
		const fileNames = fs.readdirSync(directoryPath);

		fileNames.forEach((fileName, docId) => {
			const filePath = path.join(directoryPath, fileName);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const terms = fileContent.split(' ');

			terms.forEach((term, position) => {
				this.addTerm(term, docId, position);
			});
		});
	}
}
