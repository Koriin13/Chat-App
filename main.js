const app = require('./srv/app');
const db = require('./srv/db');
const chat = require('./srv/chat');
const routes = require('./srv/routes');


const port = "3001";

app.listen(port, () => console.log("Started listening"));
db.onStart();
app.use('/api', routes);
chat.onStart(app);
