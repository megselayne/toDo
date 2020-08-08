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
    show(req, res) {
        ToDo.getById(req.params.id)
        .then((todo) => {
            res.render('todos/show', {
                message: 'ok',
                data: { todo },
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
    },
    create( req, res) {
        new ToDo({
            title: req.body.title,
            category: req.body.category,
            status: req.body.status,
            description: req.body.description,
        })
        .save()
        .then(() =>{
            res.redirect(`/todos`)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
    },
    update(req,res){
        ToDo.getById(req.params.id)
        .then((todo) =>{
            return todo.update(req.body);
        })
        .then((updatedTodo) => {
            res.render('todos/edit', {
                data: { updatedTodo } 
            });
          });
      },
      destroy(req, res) {
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
