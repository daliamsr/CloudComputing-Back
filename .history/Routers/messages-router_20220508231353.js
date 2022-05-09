const express = require('express');
const router = express.Router();

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
