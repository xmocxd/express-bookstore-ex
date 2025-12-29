/** Express app for bookstore. */



// Use JSONSchema to validate the creation and updating of your books! Display an error message containing
// all of the validation errors if book creation or updating fails.

// Add integration tests for each of your routes to make sure that the response expected is sent.

// Think about certain edge cases for each of these routes and add tests for things like invalid input to make 
// sure your schema validation is correct.

// Also make sure to set ***process.env.NODE_ENV = “test”*** inside of your test file.

require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const ExpressError = require("./expressError")
const bookRoutes = require("./routes/books");

app.use("/books", bookRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});


/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;
