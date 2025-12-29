const request = require('supertest');
const app = require('../app.js');

describe('GET /books', () => {
  it('should return books object', async () => {
    const response = await request(app).get('/books');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.books).toBeDefined();
  });
});


describe('POST /books', () => {
  it('should create a new book with valid data', async () => {
    const newBook = {
      "isbn": "0691161518", 
      "amazon_url": "http://a.co/eobPtX2", 
      "author": "Matthew Lane",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year": 2017 
    };

    const response = await request(app)
      .post('/books')
      .send(newBook);

    expect(response.statusCode).toBe(201);
    expect(response.body.book).toBeDefined();
    expect(response.body.book.isbn).toBe(newBook.isbn);
    expect(response.body.book).toEqual(newBook);
  });
});



// /** GET / => {books: [book, ...]}  */

// curl http://localhost:3000/books


// /** POST /   bookData => {book: newBook}  */

// curl -X POST http://localhost:3000/books \
//   -H "Content-Type: application/json" \
//   -d '{ 
//   "isbn": "0691161518", 
//   "amazon_url": "http://a.co/eobPtX2", 
//   "author": "Matthew Lane", 
//   "language": "english", 
//   "pages": 264, 
//   "publisher": "Princeton University Press", 
//   "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games", 
//   "year": 2017 
//   }'

// // nonworking tests

// curl -X POST http://localhost:3000/books \
//   -H "Content-Type: application/json" \
//   -d '{ 
//   "isbn": "0691161518", 
//   "amazon_url": "http://a.co/eobPtX2", 
//   "author": "Matthew Lane", 
//   "publisher": "Princeton University Press", 
//   "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games", 
//   "year": 2017 
//   }'

// curl -X POST http://localhost:3000/books \
//   -H "Content-Type: application/json" \
//   -d '{ 
//   "isbn": "0691161518", 
//   "amazon_url": "http://a.co/eobPtX2", 
//   "author": "Matthew Lane", 
//   "language": "english", 
//   "pages": 264, 
//   "publisher": "Princeton University Press", 
//   "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games", 
//   "year": 2017,
//   "bacon": "non"
//   }'