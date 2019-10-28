var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var fs = require('fs');

var file = './public/files/artistList.json';

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.post('/', function(req, res) {
  var artistName = req.body.name;
  var artistAbout = req.body.about;
  var artistUrl = req.body.url;
  var toBeDeleted = req.body.delete;

  if (toBeDeleted == "yes") {
    
  }

  var obj = { 
             name: artistName,
             about: artistAbout,
             url: artistUrl
            };

  

  fs.readFile(file, (err, data) => {
    if (err && err.code === "ENOENT") {
      return fs.writeFile(file, JSON.stringify([obj]), error => console.error);
    }
    else if (err) {
      console.error(err);
    }
    else {
      try {
        const fileData = JSON.parse(data);
  
        fileData.push(obj);
  
        return fs.writeFile(file, JSON.stringify(fileData), error => console.error)
      } catch(exception) {
        console.error(exception);
      }
    }
  });
  res.redirect('/');
  // res.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
