const router = require('express').Router();
const Todo = require('../models/todos');

router.get('/', (req, res) => {
    Todo.find({}).then((results) => {
        let todos = results.filter(todo => {
            return !todo.done;
        });
        let done = results.filter(todo => {
            return todo.done;
        });
        res.render('index', {todos: todos, done: done});
    });
});

router.post('/add', (req, res) => {
    let t = new Todo({description: req.body.description});
    t.save().then(result => {
        //console.log(result);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    });
});

router.post('/done/:id', (req, res) => {
    Todo.findById(req.params.id).exec().then(result => {
        result.done = true;
        return result.save();
    }).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    });
});

router.post('/delete/:id', (req, res) => {
    Todo.findOneAndDelete(req.params.id).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    });
});

module.exports = router;