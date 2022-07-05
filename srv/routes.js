const { Router } = require('express')
const mongoose = require('mongoose')
const User = require('./models/User');
const ChatMessage = require('./models/Message');

// Registration

const router = Router();

router.post('/register', async (req, res) => {
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

// Get Message History for a room
router.get('/messages', (req, res) => {
  // Add filter for room
  ChatMessage.find({}, (err, messages) => {
    res.send(messages)
  })
})

module.exports = router;