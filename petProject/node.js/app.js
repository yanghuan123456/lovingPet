var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var test = require('./routes/test');
var shopStore = require('./routes/shopStore');
var items = require('./routes/items');
var order = require('./routes/order');
var pethosts = require('./routes/pethosts');
var pets = require('./routes/pets');
var services = require('./routes/services');
var users = require('./routes/users');
var index = require('./routes/index');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'qwer',
  resave:true,
  saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));//静态目录根路径

app.use('/', index);
app.use('/shopStore', shopStore);
app.use('/test', test);
app.use('/items', items);
app.use('/order', order);
app.use('/pethosts', pethosts);
app.use('/pets', pets);
app.use('/services', services);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  console.log("报错啦！！！！！！",err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render('error');
});

module.exports = app; 
