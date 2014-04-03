var express = require('express'),
  util = require('./util'),
  videoEngine = require('./main');

var app = express();

app.configure(function () {
  app.use(express.favicon())
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.cookieParser())
  app.engine('jade', require('jade').__express);
  app.use('/style', express.static('style/'));
  app.use('/www', videoEngine({ap: app}));
  app.use('/www', express.static(util.base))
  app.use('/www2', express.static(util.base))
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
