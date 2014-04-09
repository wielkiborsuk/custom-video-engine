var util = require('./util');
var fs = require('fs');
var express = require('express');
var jade = require('jade');

module.exports = function (options) {
  var app;
  var prefix = '';
  var path;
  if (options) {
    app = options.ap;
    prefix = options.prefix || '';
    path = options.path || '/home/borsuk/';
  }

  if (app) {
    app.engine('jade', jade.__express);
    app.use(prefix + '/style', express.static('style/'));
    app.use(prefix + '/scripts', express.static('scripts/'));
    app.use(prefix + '/files', express.static(path));
  }



  return function (req, res, next) {
    if (req.path.match('^\/files\/') || req.path.match('^\/style\/')) {
      next();
      return;
    }

    if (req.path.match('^\/list\/')) {
      res.send(fileScan(path));
      return;
    }

    var model = {
      stylePath: prefix + '/style',
      scriptPath: prefix + '/scripts',
      filesPath: prefix + '/files/',
      prefix: prefix,
      src: req.path,
    }

    res.send(jade.renderFile('./views/video.jade', model));
  };

  function fileScan(path) {
    var fls = fs.readdirSync(path);
    var files = [];
    for (var i in fls) {
      var f = fls[i];
      if (f.match(/\.mp4$/)) {
        files.push(f);
      }
    }
    return files;
  }
};

