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

module.exports = router;
