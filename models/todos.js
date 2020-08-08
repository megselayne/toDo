const db = require('../db/config');

class ToDo {
  constructor(todo) {
    this.id = todo.id || null;
    this.title = todo.title;
    this.category = todo.category;
    this.status = todo.status;
    this.description = todo.description;
    this.user_id = todo.user_id || null;
  }

  static getAll() {
    return db
      .manyOrNone('SELECT * FROM to_dos ORDER BY id ASC')
      .then((todos) => {
        return todos.map((todo) => {
          return new this(todo);
        });
      });
  }

  static getById(id) {
    return db
      .oneOrNone('SELECT * FROM to_dos WHERE id = $1', id)
      .then((todo) => {
        if (todo) return new this(todo);
        throw new Error('To-do not found');
      });
  }

  save() {
    //identified that user_id is not being passed from controller here.
    //it's null
    return db
      .one(
        `
      INSERT INTO to_dos (title, category, status, description, user_id)
      VALUES ($/title/, $/category/, $/status/, $/description/, $/user_id/)
      RETURNING *`,
        this
      )
      .then((todo) => {
        return Object.assign(this, todo);
      });
  }

  update(changes) {
    Object.assign(this, changes);
    return db
      .oneOrNone(
        `
      UPDATE to_dos SET
        title = $/title/,
        category = $/category/,
        status = $/status/,
        description = $/description/
      WHERE id = $/id/
      RETURNING *
    `,
        this
      )
      .then((todo) => {
        return Object.assign(this, todo);
      });
  }

  delete() {
    return db.oneOrNone('DELETE FROM to_dos WHERE id = $1', this.id);
  }
}

module.exports = ToDo;