const db = require("../connection");

const seed = () => {
  return db
    .query("DROP TABLE IF EXISTS categories")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL)
`);
    })
    .then(() => {
      return db.query(`CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY, 
    category_name VARCHAR(255) NOT NULL UNIQUE)
`);
    });
};

module.exports = seed;
