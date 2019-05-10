const router = require('express').Router();
const Todo = require('../models/todos');
const winston = require('winston');
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: 'info.log' })
    ]
  });

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
    logger.info('Added: ' + req.body.description);
    let t = new Todo({description: req.body.description});
    t.save().then(result => {
        //console.log(result);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        logger.error(err);
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
        logger.error(err);
        res.redirect('/');
    });
});

router.post('/delete/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        logger.error(err);
        res.redirect('/');
    });
});

module.exports = router;