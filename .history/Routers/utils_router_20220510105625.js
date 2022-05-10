const express = require('express');
const { detectLanguage, translateText } = require('../Utils/translate_functions');
const router = express.Router();
const { detectLabels } = require('../Utils/image_recognition_functions');
const { LANGUAGE_ISO_CODE } = require('../Utils/dictionaries');
const { sendMail } = require('../Utils/mail_functions');

router.get('/labels', async (req, res) => {
  const { link } = req.body;
  console.log(link);
  console.log(body);
  if (!link) {
    return res.status(400).send('Bad request. Missing parametres.');
  }
  const labels = await detectLabels(link);
  console.log(labels);
  return res.json({
    labels,
  });
});

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

router.post('/send', (req, res) => {
  const { senderName, senderMail, receiverMail, messageContent } = req.body;
  if (!senderName || !senderMail || !receiverMail || !messageContent) {
    return res.status(400).send('Missing Parameters');
  }
  sendMail(receiverMail, senderMail, messageContent, `${senderName} has sent you a message`);
  res.send(200);
});
module.exports = router;
