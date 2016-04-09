var express = require('express');
var app = express.Router();
app.get('/', function(req, res, next) {
  res.render('info');
});
module.exports = app;