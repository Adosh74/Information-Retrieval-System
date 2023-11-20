# Information-Retrieval-System

-   [Introduction](#introduction)
-   [PRD: Information Retrieval System](#prd-information-retrieval-system)
-   [Technologies and Tools](#technologies-and-tools)

## Introduction

This is a simple information retrieval system that can be used to search for documents in a corpus. The system is based on the positional index data structure. The system is built using Node.js and Express.js. The system is built as a part of the course **CS F313 Data Storage and Retrieval** at Helwan University Software Engineering program 2023/2024.

## PRD: Information Retrieval System

1. Tokenization should be done using the following rules:

    - Splitting on whitespace. [✅]
    - Removing punctuation. [✅]
    - Removing stop words. [✅]
    - Stemming using the Porter Stemmer algorithm. [✅]

2. **Constructing Auxiliary structure(s) (Positional index)** to speed up the search process should be done. [wip]

3. **Phrase query** search should be supported using the positional index. [wip]

4. **Term frequency** and inverse document frequency should be used to rank the documents in the corpus. [wip]

5. **Idf** smoothing should be used to rank the documents. [wip]

6. **TF.idf** matrix should be normalized using the cosine normalization technique. [wip]

7. **Similarity between query and each document** should be computed using the cosine similarity measure. [wip]

## Technologies and Tools

-   Node.js
-   Express.js
-   Typescript
