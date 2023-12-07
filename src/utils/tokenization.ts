import { removeStopwords } from 'stopword';

const Tokenization = (token: string) => {
	const tokenized = token.trim().toLowerCase().split(' ');
	return tokenized;
};

export default Tokenization;
