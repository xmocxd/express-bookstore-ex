
// You will be adding validation to an application that stores one resource, books. Here is an example of what 
// a book object should look like:

// ```jsx
// {
//   "isbn": "0691161518",
//   "amazon_url": "http://a.co/eobPtX2",
//   "author": "Matthew Lane",
//   "language": "english",
//   "pages": 264,
//   "publisher": "Princeton University Press",
//   "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
//   "year": 2017
// }
// ```


const express = require('express');
const Ajv = require('ajv');
const addFormats = require('ajv-formats').default;

const app = express();
const ajv = new Ajv();
addFormats(ajv);

app.use(express.json());

const bookSchema = {
  type: 'object',
  properties: {
    isbn: { type: 'string', minLength: 1 },
    amazon_url: { type: 'string', format: 'uri' },
    author: { type: 'string', minLength: 1 },
    language: { type: 'string', minLength: 1 },
    pages: { type: 'integer', minimum: 1 },
    publisher: { type: 'string', minLength: 1 },
    title: { type: 'string', minLength: 1 },
    year: { type: 'integer', minimum: 0 },
  },
  required: ['isbn', 'amazon_url', 'author', 'language', 'pages', 'publisher', 'title', 'year'],
  additionalProperties: false,
};

function validateSchema(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (!validate(req.body)) {
      return res.status(400).json(validate.errors);
    }
    next();
  };
}

module.exports = { validateSchema, bookSchema };