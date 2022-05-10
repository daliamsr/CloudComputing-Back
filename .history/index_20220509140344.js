const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const messagesRouter = require('./Routers/messages-router');
const utilsRouter = require('./Routers/utils_router');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/messages', messagesRouter);
app.use('/utils', utilsRouter);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Cloud computing app listening on port ${port}!`);
});
