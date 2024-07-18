import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamFaceExpression = () => {
  const webcamRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [expressions, setExpressions] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = './models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setIsModelLoaded(true);
    };

    loadModels();
  }, []);

  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const img = await faceapi.fetchImage(imageSrc);
      const fullFaceDescription = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (fullFaceDescription) {
        const expressions = fullFaceDescription.expressions;
        const sortedExpressions = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
        setExpressions(sortedExpressions[0][0]);
      } else {
        setExpressions('Face not detected.');
      }
    }
  };

  return (
    <div className="webcam-container">
      <h2>Webcam Face Expression Recognition</h2>
      {isModelLoaded ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
          />
            <div>
                {expressions && <p>Expression: {expressions}</p>}
                <button onClick={capture}>Capture and Recognize Expression</button>                
            </div>
        </div>

      ) : (
        <p>Loading Models...</p>
      )}
    </div>
  );
};

export default WebcamFaceExpression;