const db = require('../db/config');
const ToDo = require('../models/todos');

class User {
  constructor({ id, username, email, password_digest }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_digest = password_digest;
  }

  static findByUserName(username) {
    return db
      .oneOrNone('SELECT * FROM users WHERE username = $1', username)
      .then((user) => {
        if (user) return new this(user);
        else throw new Error('User not found');
      });
  }

  save() {
    return db
      .one(
        `INSERT INTO users
        (username, email, password_digest)
        VALUES ($/username/, $/email/, $/password_digest/)
        RETURNING *`,
        this
      )
      .then((savedUser) => Object.assign(this, savedUser));
  }
  findUserTodos() {
    return db
    .manyOrNone(`SELECT * FROM to_dos WHERE user_id = $1`, this.id)
    .then((todos) =>{
      return todos.map((todo) => new ToDo(todo));
    });
  }
}

module.exports = User;