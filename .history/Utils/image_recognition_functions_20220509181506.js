const vision = require('@google-cloud/vision');
const dotenv = require('dotenv');
dotenv.config();

const imageRecognitionAPI = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

async function detectLabels(link) {
  try {
    const [result] = await imageRecognitionAPI.labelDetection(link);
    const labels = result.labelAnnotations;
    const labelsDescriptions = labels.map((label) => {
      return label.description;
    });
    return labelsDescriptions;
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
  detectLabels,
};
