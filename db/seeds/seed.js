const db = require("../connection");

const seed = () => {
  return db.query("DROP TABLE IF EXISTS users;").then(() => {
    return db.query(`CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL
)
`);
  });
};

module.exports = seed;
