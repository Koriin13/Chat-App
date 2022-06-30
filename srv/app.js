const path = require('path')
var express = require('express');
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

var app = express();

app.use(express.static(path.resolve(__dirname, '..', 'front-end')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

module.exports = app;