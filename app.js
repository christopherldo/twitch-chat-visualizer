const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/index');
const mustacheExpress = require('mustache-express');
const helpers = require('./helpers');

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.helpers = {
    ...helpers
  };

  next();
});

app.use('/', router);

app.engine('mustache', mustacheExpress(__dirname + '/views/partials', '.mustache'));
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

module.exports = app;