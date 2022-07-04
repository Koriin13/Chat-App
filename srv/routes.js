const { Router } = require('express')
const { router } = Router();
const mongoose = require('mongoose')
const User = require('./models/User');
const ChatMessage = require('./models/Message');



// Declare MongoDB Schemas
var Message = mongoose.model('Message', {
    name: String,
    message: String
  })

// Registration

router.post('/register', async(req, res) => {
    const takenUsername = await User.findOne({ username: req.body.username })

    if (takenUsername) {

    } else {
        const dbUser = new User({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })

        dbUser.save()
        redirect.index();
        res.end();
    }
})

// Get Message History
router.get('/messages', (req, res) => {
    ChatMessage.find({}, (err, messages) => {
        res.send(messages)
    })
}
)

// Login
router.post('/login', async(req, res) => {
    if (req != null && req.body != null) {
        const user = await User.findOne({ username: req.body.username })
        const roomName = req.body.room
        if (user.password == req.body.password) {
            res.cookie('username', user.username)
            res.cookie('room', roomName)
                        
            // socket connection
       
            redirect.chat();
            res.end();
        }
    } else {
        redirect.index();
        res.end();
    }
}) 


router.post('/chatMessages', (req, res) => {
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

router.post('/messages', (req, res) => {
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

