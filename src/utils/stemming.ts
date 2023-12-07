import natural from 'natural';

// import {stemmer} from 'stemmer'

const Stemming = (word: string) => {
	const stemmer = natural.PorterStemmer;
	const stemmed = stemmer.stem(word);
	return stemmed;
};

export default Stemming;
