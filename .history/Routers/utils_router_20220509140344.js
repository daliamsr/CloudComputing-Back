const express = require('express');
const { detectLanguage } = require('../Utils/translate_functions');
const router = express.Router();

router.get('/detect', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('Missing Parameters');
  }
  const languageDetection = await detectLanguage(text);
  return res.json({
    language: languageDetection,
  });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query(`SELECT * FROM messages where entryID = ${mysql.escape(id)}`, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length) {
      return res.status(400).json({
        error: 'Message not found',
      });
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
  const queryString = `INSERT INTO messages (senderName, senderMail, receiverMail, messageContent) VALUES (${mysql.escape(senderName)},
   ${mysql.escape(senderMail)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`;

  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('Bad request. Missing parametres.');
  }
  const queryString = `DELETE FROM messages WHERE entryID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Message not found.');
    }
    return res.json({
      results,
    });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('Bad request. Missing parametres.');
  }
  const { senderName, senderMail, receiverMail, messageContent } = req.body;
  if (!senderName || !senderMail || !receiverMail || !messageContent) {
    // send bad request error
    return res.status(400).send('Bad request. Missing parametres.');
  }
  const queryString = `UPDATE messages SET senderName = ${mysql.escape(senderName)}, senderMail = ${mysql.escape(senderMail)}, receiverMail = ${mysql.escape(
    receiverMail
  )}, messageContent = ${mysql.escape(messageContent)} WHERE entryID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Message not found.');
    }
    return res.json({
      results,
    });
  });
});
module.exports = router;
