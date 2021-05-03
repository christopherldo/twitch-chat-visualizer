const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const controllers = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let controllerName = file.split('.')[0];
    const controller = require(path.join(__dirname, file));
    controllers[controllerName] = controller;
  });

module.exports = controllers;