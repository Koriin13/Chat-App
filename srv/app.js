const path = require('path')
var express = require('express');
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')

// Connection string
var dbUrl = 'mongodb+srv://kg:blah@a2cluster.g2h4x.mongodb.net/SimpleChat?retryWrites=true&w=majority'

// MongoDB connection
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('mongodb connected', err);
    } else {
        console.log('Successfully mongodb connected');
    }
})

var app = express();

app.use(express.static(path.resolve(__dirname, '..', 'front-end')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



app.use(cookieParser())


module.exports = app;