const express = require('express');
const mustache = require('mustache-express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true}).then( () => {
    console.log('Database connected');
}).catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const m = mustache()
m.cache = null;
app.engine('mustache', m);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use('/', routes);
//app.use(express.static(__dirname + '/css'));

app.listen(3000, () => {
    console.log('listening on port 3000...');
});