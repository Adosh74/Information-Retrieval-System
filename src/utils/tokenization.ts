import { removeStopwords } from 'stopword';

const Tokenization = (token: string) => {
	const tokenized = removeStopwords(token.split(' '));
	return tokenized;
};

export default Tokenization;
