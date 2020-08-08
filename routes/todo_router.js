const express = require('express');
const todoRouter = express.Router();

const todoController = require('../controllers/todo_controller');

todoRouter.get('/', todoController.index);
todoRouter.get('/:id([0-9]+)', todoController.show, (req,res) =>{
    res.render('todos/show',{
        todo: res.locals.todo,
    });
});
todoRouter.get('/add', (req, res) =>{
    res.render('todos/add');
})
todoRouter.post('/', todoController.create);
todoRouter.get('/:id([0-9])+/edit', todoController.show, (req, res) =>{
    res.render('todos/edit', {
        todo: res.locals.todo,
    });
});
todoRouter.put('/:id', todoController.update);
todoRouter.delete('/:id([0-9]+)', todoController.destroy);




module.exports = todoRouter;