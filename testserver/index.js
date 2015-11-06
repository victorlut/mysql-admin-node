var express = require('express');
var app = express();
var mysql = require('mysql');

var nodeadmin = require(__dirname + '/../src/index.js');


app.use(nodeadmin(app, 4040));
app.use('/', function(req, res, next) {

  res.send('<h1>HELLO WORLD</h1>');

});

app.listen(4040);

module.exports = app;
