module.exports = function(app) {
  var movieRoutes = require('./movie_routes');
  movieRoutes(app);
  var bookRoutes = require('./book_routes');
  bookRoutes(app);
};