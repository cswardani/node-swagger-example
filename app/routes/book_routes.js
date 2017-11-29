'use strict';
//var bookRoutes = require(__dirname+'/../control/book.js');
module.exports = function(app) {
  var control = require('../control/book.js');

  app.get('/book', function(req, res, next) {
      control.getAll(req, res, next);
  });
  app.post('/book', function(req, res, next) {
    control.save(req, res, next);
  });
  app.get('/book/{:id}', function(req, res, next) {
    control.getOne(req, res, next);
  });
  app.put('/book/{id}', function(req, res, next) {
    control.update(req, res, next);
  });
  app.delete('/book/{id}', function(req, res, next) {
    control.delbook(req, res, next);
  });
};