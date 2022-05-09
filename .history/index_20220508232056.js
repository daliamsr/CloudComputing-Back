const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const messagesRouter = require('./Routers/messages-router');

app.use(bodyParser.json());
const app = express();
app.use(cors());
app.use('messages', messagesRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Cloud computing app listening on port ${port}!`);
});
