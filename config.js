/** Common config for bookstore. */

//postgresql://username@localhost/databasename

const DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;

module.exports = { DB_URI };