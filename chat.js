const socketio = require('socket.io');
const http = require('http');

// Server sided chat features


// Declare MongoDB Schemas
var Message = mongoose.model('Message', {
  name: String,
  message: String
})

// Connection string
var dbUrl = 'mongodb+srv://kg:blah@a2cluster.g2h4x.mongodb.net/SimpleChat?retryWrites=true&w=majority'


const chat = {};

chat.servers = {};

chat.onStart = function (app) {
  
  chat.servers.http = http.Server(app);
  chat.servers.io = socketio(chat.servers.http);
  chat.servers.io.use((socket, next) => {

  const username = socket.handshake.auth.username;

  const user = await User.findOne({ username: req.body.username })
  
  const roomName = req.body.room
    if (user.user != username ) {
      return next(new Error("invalid username or room"));
    }
    socket.username = username;
    next();
    // make sure a room name is given
    // next(new Error("Failed for whatever reason"))
    // next(); -> Success
  });
  // todo: setup middleware to validate username/password of users connecting
  chat.servers.io.on('connecion', onConnection);
};

function onConnection(socket) {

  const io = chat.servers.io;

  io.on('connection', (socket) => {

    socket.on('sendMsg', (data) => {
        const msg = {
            msg: data.message,
            name: data.username
        }
        socket.broadcast.to(data.room).emit('msg', msg)
    })
 

    socket.on('messageRoom', (data) => {
        const message = {
            username: data.username,
            message: data.message
        }
        console.log(`${data.username} sent a message to ${data.room}`)

        // Add message to db
        const dbChatMessage = new ChatMessage({
            from_user: data.username,
            room: data.room,
            message: data.message
        })
        dbChatMessage.save()

        socket.broadcast.to(data.room).emit('newMessage', message)
    })
  })

}

function onJoinRoom(socket, room) {
  // If user is in another room, leave that room
  // then put the user in the new room

    // JOIN ROOM
    socket.on('joinRoom', (room) => {
      socket.join(room)
      redirect.chat()
  })
}

function onTyping(socket,) {
  socket.on("typing", () => {
    socket.broadcast.emit("typing..", { user: socket.username })
})
}

// Listing all users
function listUsers(socket) {
  
}

module.exports = chat;