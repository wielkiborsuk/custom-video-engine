var util = require('./util');

module.exports = function (options) {
  var app;
  if (options) {
    app = options.ap;
  }

  return function (req, res, next) {
    if (!!req.path.match('\.mp4$')) {
      res.render('video.jade', {src: '/www2'+req.path});
    } else {
      next();
    }
  };
};

