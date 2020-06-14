const express = require('express');
const url = require('url');

var app = express();

app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});


  const pub_dir = __dirname + '../dist';
  app.set('port', process.env.PORT || 8080);
  app.engine('.html', require('ejs').__express);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.static(pub_dir));
  app.use(app.router);

app.get('/*', function(req, res) {
    if (req.xhr) {
        var pathname = url.parse(req.url).pathname;
        res.sendfile('index.html', {root: __dirname + '/dist' + pathname});
    } else {
        res.render('index');
    }
});

app.listen(app.get('port'));