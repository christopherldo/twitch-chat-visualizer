require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const mustacheExpress = require('mustache-express');
const helpers = require('./helpers');

const server = express();

server.use(cors());
server.enable('trust proxy');

server.use(express.json());

server.use(express.urlencoded({
  extended: true,
}));

server.use(express.static(path.join(__dirname, '../public')));

server.use((req, res, next) => {
  res.locals.helpers = {
    ...helpers
  };

  next();
});

server.use('/', routes);

server.engine('mustache', mustacheExpress(__dirname + '/views/partials', '.mustache'));
server.set('view engine', 'mustache');
server.set('views', __dirname + '/views');

module.exports = server;