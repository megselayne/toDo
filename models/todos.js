const db = require('../db/config');

class ToDo {
  constructor(todo) {
    this.id = todo.id || null;
    this.title = todo.title;
    this.category = todo.category;
    this.status = todo.status;
    this.description = todo.description;
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
    return db
      .one(
        `
      INSERT INTO to_dos (name, cuteness, species, location)
      VALUES ($/name/, $/cuteness/, $/species/, $/location/)
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
        name = $/name/,
        cuteness = $/cuteness/,
        species = $/species/,
        location = $/location/
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