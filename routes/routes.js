const router = require('express').Router();
const todo = require('../models/todo');

router.get('/', (req, res) => {
    res.render('index', {});
});

module.exports = router;