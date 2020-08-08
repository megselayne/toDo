const ToDo = require('../models/todos');

const todoController = {
    index(req, res, next){
        ToDo.getAll()
        .then((todos) =>{
            res.render('todos/index', {
                message: 'ok',
                data: { todos },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
    },
    show(req, res, next) {
        ToDo.getById(req.params.id)
        .then((todo) => {
            res.locals.todo = todo;
            console.log(res.locals.todo);
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
    },
    create( req, res, next) {
        console.log(req.user.id);
        new ToDo({
            title: req.body.title,
            category: req.body.category,
            status: req.body.status,
            description: req.body.description,
            user_id: req.user.id,
        })
        .save()
        .then((todo) =>{
            res.redirect(`/user`);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
    },
    update(req, res, next){
        ToDo.getById(req.params.id)
        .then((todo) =>{
            return todo.update(req.body);
        })
        .then((updatedTodo) => {
            res.redirect(`/todos/${updatedTodo.id}`);
          })
          .catch(next);
      },
      destroy(req, res, next) {
        ToDo.getById(req.params.id)
        .then((todo) => {
            return todo.delete();
        })
        .then(() => {
            res.redirect('/todos');
        });
      }
}


module.exports = todoController;
