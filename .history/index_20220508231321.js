const express = require('express');
const cors = require('cors');
const connection = require('./database');
const messagesRouter = require('./Routers/messages-router');

const app = express();
app.use(cors());
app.use('messages', messagesRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Cloud computing app listening on port ${port}!`);
});
