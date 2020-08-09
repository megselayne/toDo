const express = require('express');
const todoRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const todoController = require('../controllers/todo_controller');

todoRouter.get('/', todoController.index);
todoRouter.get('/:id([0-9]+)', todoController.show, (req,res) =>{
    res.render('todos/show',{
        todo: res.locals.todo,
    });
});
todoRouter.get('/add', authHelpers.loginRequired,(req, res) =>{
    res.render('todos/add');
})
todoRouter.get('/about', (req,res) =>{
    res.render('todos/about');
})
todoRouter.post('/', todoController.create);
todoRouter.get('/:id([0-9])+/edit', todoController.show, (req, res) =>{
    res.render('todos/edit', {
        todo: res.locals.todo,
    });
});
todoRouter.put('/:id', authHelpers.loginRequired, todoController.update);
todoRouter.delete('/:id([0-9]+)', authHelpers.loginRequired, todoController.destroy);




module.exports = todoRouter;