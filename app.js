const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true}).then( () => {
    console.log('Database connected.');
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));

const m = mustache()
m.cache = null;
app.engine('mustache', m);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use('/', routes);

app.listen(3000, (req, res) => {
    console.log('listening on port 3000...');
});