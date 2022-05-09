const express = require('express');
const router = express.Router();
const connection = require('/./database');
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

module.exports = router;
