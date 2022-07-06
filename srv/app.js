const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();
// var PORT = process.env.PORT
// console.log(PORT)
// // var server = 
// app.listen(PORT, function() {
//     console.log('server listening at', server.address())
// })

app.use(express.static(path.resolve(__dirname, '..', 'front-end')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.unsubscribe(cors());

module.exports = app;