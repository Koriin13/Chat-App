const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'front-end')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

module.exports = app;