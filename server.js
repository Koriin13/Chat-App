
var mongoose = require('mongoose')
const { Socket } = require("socket.io");
const User = require('./srv/models/User');
const ChatMessage = require('./srv/models/Message');





// // Declare MongoDB Schemas
// var Message = mongoose.model('Message', {
//     name: String,
//     message: String
// })

// // Connection string
// var dbUrl = 'mongodb+srv://kg:blah@a2cluster.g2h4x.mongodb.net/SimpleChat?retryWrites=true&w=majority'


app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err) {
            // sendStatus(500);
            console.log(err)
        }

        // Send Message to all users
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

// Registration
// app.get('/register', function(req, res) {
//     res.sendFile(mainDir + '/register.html');
// })

// app.post('/register', async(req, res) => {
//     const takenUsername = await User.findOne({ username: req.body.username })

//     if (takenUsername) {

//     } else {
//         const dbUser = new User({
//             username: req.body.username,
//             password: req.body.password,
//             firstname: req.body.firstname,
//             lastname: req.body.lastname
//         })

//         dbUser.save()
//         res.writeHead(301, { Location: 'http://localhost:3001' });
//         res.end();
//     }
// })

// Login
app.get('/chat', function(req, res) {
    res.sendFile(mainDir + '/chat.html');
});

app.post('/login', async(req, res) => {
    if (req != null && req.body != null) {
        const user = await User.findOne({ username: req.body.username })
        const roomName = req.body.room
        if (user.password == req.body.password) {
            res.cookie('username', user.username)
            res.cookie('room', roomName)
                        
            // socket connection
        io.on("connection", socket => {
                socket.join(roomName);
              });

            res.writeHead(301, { Location: `http://localhost:3001/chat` })
            res.end();
        }
    } else {
        res.writeHead(301, { Location: 'http://localhost:3001/' })
        res.end();
    }
}) 


// Global message
app.get('/chatMessages', (req, res) => {
    ChatMessage.find({}, (err, messages) => {
        console.log(messages)
        res.send(messages);
    })
})


app.post('/chatMessages', (req, res) => {
    console.log("This is the request body", req.body)
    const msg = {
        from_user: req.body.username,
        room: req.body.room,
        message: req.body.message
    }
    var message = new ChatMessage(msg);
    message.save((err) => {
        if (err) {
            console.log(err)
        }
    })
})

// Logout route

// Socket connection
// io.on('connection', (socket) => {

//     const joinMsg = {
//         msg: 'Welcome to the chatroom',
//         name: 'SERVER'
//     }
//     socket.emit('joinMsg', joinMsg)

//     socket.on('joinRoom', (room) => {
//         socket.join(room)
//     })

//     socket.on('sendMsg', (data) => {
//         const msg = {
//             msg: data.message,
//             name: data.username
//         }
//         socket.broadcast.to(data.room).emit('msg', msg)
//     })

//     socket.on("typing", () => {
//         socket.broadcast.emit("typing..", { user: socket.username })
//     })

//     socket.on('messageRoom', (data) => {
//         const message = {
//             username: data.username,
//             message: data.message
//         }
//         console.log(`${data.username} sent a message to ${data.room}`)

//         // Add message to db
//         const dbChatMessage = new ChatMessage({
//             from_user: data.username,
//             room: data.room,
//             message: data.message
//         })
//         dbChatMessage.save()

//         socket.broadcast.to(data.room).emit('newMessage', message)
//     })

    // disconnect
    socket.on("disconnect", () => {
        const byeMsg = {
            msg: `USER has left`,
            name: 'SERVER'
        }
        console.log("goodbye")
        socket.broadcast.emit("byeMsg", byeMsg)
    })

})

// MongoDB connection
// mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
//     if (err) {
//         console.log('mongodb connected', err);
//     } else {
//         console.log('Successfully mongodb connected');
//     }
// })


// Listen to port 3001
var server = http.listen(3001, () => {
    console.log('server is running on port', server.address().port)
})