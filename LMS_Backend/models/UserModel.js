const db = require("../config/db");

const getUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

const createUser = (user, callback) => {
  db.query("INSERT INTO users SET ?", user, callback);
};

module.exports = { getUserByEmail, createUser };
