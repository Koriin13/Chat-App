const http = require('http');
const User = require('./models/User');

// Server sided chat features





const socketio = require('socket.io');

const chat = {};

chat.servers = {};

chat.onStart = function (app) {
  chat.servers.http = http.Server(app);
  chat.servers.io = socketio(chat.servers.http);

  chat.servers.io.use(async (socket, next) => {
    const auth = socket.handshake.auth;
    const username = auth.username;
    const password = auth.password;
    

    const user = await User.findOne({ username: username });
    if (user.password == password) {
      next();
    } else {
      next(new Error("Invalid username/password combination"));
    }
  });

  chat.servers.io.on('connection', (socket) => {
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

function onTyping(socket) {
  socket.on("typing", () => {
    socket.broadcast.emit("typing..", { user: socket.username })
  })
}

// Listing all users
function listUsers(socket) {

}


module.exports = chat;