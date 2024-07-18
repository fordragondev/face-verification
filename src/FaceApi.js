import * as faceapi from 'face-api.js';

export async function loadModels() {
  const MODEL_URL = './models';
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
}

export async function getFullFaceDescription(blob) {
  const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 });
  const img = await faceapi.bufferToImage(blob);
  const fullDesc = await faceapi.detectAllFaces(img, options)
    .withFaceLandmarks()
    .withFaceDescriptors();
  return fullDesc;
}