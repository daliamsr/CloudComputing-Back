const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { senderName, senderMail, receiverMail, messageContent } = req.body;

  if (!senderName || !senderMail || !receiverMail || !messageContent) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }
  connection.query(
    `INSERT INTO messages(senderName, senderMail, receiverMail, messageContent) values (${mysql.escape(senderName)}),${mysql.escape(senderMail)},${mysql.escape(
      receiverMail
    )},${mysql.escape({ messageContent })})`,
    (err, results) => {
      if (err) {
        return res.send(err);
      }

      return res.json({
        results,
      });
    }
  );
  return res.send('Ok');
});

module.exports = router;
