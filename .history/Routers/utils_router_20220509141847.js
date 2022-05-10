const express = require('express');
const { detectLanguage, translateText } = require('../Utils/translate_functions');
const router = express.Router();

router.get('/detect', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('Missing Parameters');
  }
  const languageDetection = await detectLanguage(text);
  return res.json({
    language: languageDetection[0]?.language,
  });
});
router.get('/translate', async (req, res) => {
  const { text, language } = req.body;

  if (!text || !language) {
    return res.status(400).send('Missing Parameters');
  }
  const translatedText = await translateText(text, language);
  return res.json({
    translatedText: translatedText[0],
  });
});

module.exports = router;
