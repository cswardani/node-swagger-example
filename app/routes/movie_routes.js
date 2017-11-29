'use strict';
//var movieRoutes = require(__dirname+'/../control/movie.js');
module.exports = function(app) {
  var control = require('../control/movie.js');

  app.get('/movie', function(req, res, next) {
      control.getAll(req, res, next);
  });
  app.post('/movie', function(req, res, next) {
    control.save(req, res, next);
  });
  app.get('/movie/{:id}', function(req, res, next) {
    control.getOne(req, res, next);
  });
  app.put('/movie/{id}', function(req, res, next) {
    control.update(req, res, next);
  });
  app.delete('/movie/{id}', function(req, res, next) {
    control.delMovie(req, res, next);
  });
};