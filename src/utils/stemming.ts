import natural from 'natural';

const Stemming = (word: string) => {
	const stemmer = natural.PorterStemmer;
	const stemmed = stemmer.stem(word);
	return stemmed;
};

export default Stemming;
