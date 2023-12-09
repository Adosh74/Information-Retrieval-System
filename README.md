# Information-Retrieval-System

-   [Introduction](#introduction)
-   [PRD: Information Retrieval System](#prd-information-retrieval-system)
-   [API Documentation](#api-documentation)
    -   [Search](#search)
-   [How to run and Install](#how-to-run-and-install)
-   [Technologies and Tools](#technologies-and-tools)

## Introduction

This is a simple information retrieval system that can be used to search for documents in a corpus. The system is based on the positional index data structure. The system is built using Node.js and Express.js. The system is built as a part of the course **CS F313 Data Storage and Retrieval** at Helwan University Software Engineering program 2023/2024.

## PRD: Information Retrieval System

1. ✅ Tokenization should be done using the following rules:

    - ✅ Splitting on whitespace.
    - ✅ Removing punctuation.
    - ✅ Removing stop words.
    - ✅ Stemming using the Porter Stemmer algorithm.

2. ✅ **Constructing Auxiliary structure(s) (Positional index)** to speed up the search process should be done.

3. ✅ **Phrase query** search should be supported using the positional index.

4. ✅ **Term frequency** and inverse document frequency should be used to rank the documents in the corpus.

5. ✅ **Idf** smoothing should be used to rank the documents.

6. ✅ **TF.idf** matrix should be normalized using the cosine normalization technique.

7. ✅ **Similarity between query and each document** should be computed using the cosine similarity measure.

8. ✅ **Boolean query** search should be supported using the positional index.

## API Documentation

### Search

```http
`GET` /search

body: {
    query: string
}
```

## How to run and Install

```bash
# Clone the repo
git clone https://github.com/Adosh74/Information-Retrieval-System

# Install dependencies
yarn install
or
npm install

# Run the server
yarn start

# Run the server in development mode
yarn start:dev

```

-   After running the server, you can access the API through the following URL: `http://localhost:3001`

-   And display all PRD tables in console

## Technologies and Tools

-   Node.js
-   Express.js
-   Typescript
