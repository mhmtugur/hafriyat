var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
var cors = require('cors');

var index = require('./routes/index');
var dbstatus = require('./routes/dbstatus');//TODO: collect them in a health status module
var auth = require('./routes/auth/routes');
var arac = require('./routes/arac/routes');
var isletme = require('./routes/isletme/routes');
var lokasyon = require('./routes/lokasyon/routes');

var mobile = require('./routes/mobile/routes');

var app = express();
//var router = express.Router();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));
//router.use(cookieParser());
//router.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);

//jwt token handler
app.use(function(req, res, next) {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
          if(err) {
            //req.user = undefined;
            return res.status(401).json({ message: 'Unauthorized. Please signin first.' });
          }
          req.user = decode;
          next();
      });
  } else {
      return res.status(401).json({ message: 'Unauthorized. Please signin first.' });
  }
});

app.use('/arac', arac);
app.use('/lokasyon', lokasyon);
app.use('/isletme', isletme);

app.use('/dbstatus', dbstatus);

app.use('/mobile', mobile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
