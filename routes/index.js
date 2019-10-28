var express = require('express');
var router = express.Router();

var fs = require('fs');

var file = './public/files/artistList.json';

var contents;

fs.readFile(file, {'encoding': 'utf8'}, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    contents = data;
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Lab05', data: contents });
});

module.exports = router;
