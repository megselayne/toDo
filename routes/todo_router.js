const express = require('express');
const todoRouter = express.Router();

const todoController = require('../controllers/todo_controller');

todoRouter.get('/', todoController.index);
todoRouter.get('/:id([0-9]+)', todoController.show);
todoRouter.get('/add', (req, res) =>{
    res.render('todos/add');
})
todoRouter.post('/', todoController.create);




module.exports = todoRouter;