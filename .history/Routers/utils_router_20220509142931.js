const express = require('express');
const { detectLanguage, translateText } = require('../Utils/translate_functions');
const router = express.Router();
const { LANGUAGE_ISO_CODE } = require('../Utils/dictionaries.js');

processLanguage('Hello world! This is my first time using Google Translate API!');

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

  if (!LANGUAGE_ISO_CODE[language]) {
    return res.status(400).send('Invalid Language');
  }
  const translatedText = await translateText(text, language);
  return res.json({
    translatedText: translatedText[0],
  });
});

module.exports = router;
