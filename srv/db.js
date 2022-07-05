const mongoose = require('mongoose');

module.exports = {
  onStart: () => {
    // Connection string
    const dbUrl = 'mongodb+srv://kg:blah@a2cluster.g2h4x.mongodb.net/SimpleChat?retryWrites=true&w=majority'

    // MongoDB connection
    mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
      if (err) {
        console.log('mongodb connected', err);
      } else {
        console.log('Successfully mongodb connected');
      }
    })
  }
};