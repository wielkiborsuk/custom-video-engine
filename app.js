var express = require('express'),
  util = require('./util'),
  videoEngine = require('./main');

var app = express();

app.configure(function () {
  app.use(express.favicon(__dirname + '/style/favicon.ico'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.cookieParser())
  app.use('/video', videoEngine({ap: app, prefix: '/video', path: '/home/borsuk/music/aga-list/'}));
  app.use('/video2', videoEngine({ap: app, prefix: '/video2', path: '/home/borsuk/music/borsuk-list/'}));
  app.use('/www', express.static(util.base))
  app.use('/www', express.directory(util.base, {icons:true}))

  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Range, X-Requested-With');
    if (req.method == "OPTIONS") {
      res.send(200);
    } else {
      next();
    }
  })

  app.use(function (req, res) {
    res.send(404)
  })
})

module.exports = app
