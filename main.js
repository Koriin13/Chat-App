const app = require('./srv/app');
const db = require('./srv/db');
const chat = require('./srv/chat');
const routes = require('./srv/routes');

db.onStart();
app.use('/api', routes);
chat.onStart(app);
