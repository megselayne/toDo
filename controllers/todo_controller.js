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
    // create( req, res) {
    //     new ToDo({
    //         title: req.body.title,
    //         category: req.body.category,
    //         description: req.body.category,
    //     })
    //     .save()
    //     .then(() =>{
    //         res.redirect(`/todos`)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(500).json({ err, message: err.message });
    //     });
    // }
    //add update, delete controllers
}


module.exports = todoController;
