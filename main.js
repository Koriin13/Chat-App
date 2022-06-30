const app = require('./srv/app');
const chat = require('./srv/chat');
const routes = require('./srv/routes');

app.use('/api', routes);
chat.onStart(app);
