const express = require('express');
const cors = require('cors');
const connection = require('./database');
const messagesRouter = require('./messagesRouter');

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;
app.get('/messages', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});
app.listen(port, () => {
  console.log(`Cloud computing app listening on port ${port}!`);
});
