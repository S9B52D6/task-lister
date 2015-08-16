var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/static/'));

http.listen(8000, function() {
  console.log("Listening on port 8000");
});
