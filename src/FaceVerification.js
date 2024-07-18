import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { loadModels, getFullFaceDescription } from './FaceApi';

const FaceVerification = () => {
  const [image, setImage] = useState(null);
  const [fullDesc, setFullDesc] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const inputRef = useRef();
  let referenceDescriptor = [ ];

  const [image2, setImage2] = useState(null);
  const [fullDesc2, setFullDesc2] = useState(null);
  const inputRef2 = useRef();
  let referenceDescriptor2 = [ ];

  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadModels().then(() => {
      setIsModelLoaded(true);
    });
  }, []);

  const handleImageUpload = async (e) => {
    setError('');
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setImage(URL.createObjectURL(file));
      const fullFaceDescription = await getFullFaceDescription(file);  

      if (fullFaceDescription && fullFaceDescription.length > 0) {
        setFullDesc(fullFaceDescription);
        console.log("FullFaceDescription result:",fullFaceDescription);
        referenceDescriptor = fullFaceDescription[0].descriptor;        
      } else {
        setError('Face not detected in the first image.');
        setFullDesc(null);
      }
    }
  };

  const handleImageUpload2 = async (e) => {
    setError('');
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setImage2(URL.createObjectURL(file));
      const fullFaceDescription = await getFullFaceDescription(file);  

      if (fullFaceDescription && fullFaceDescription.length > 0) {
        setFullDesc2(fullFaceDescription[0].descriptor);
        console.log("FullFaceDescription result:",fullFaceDescription);
        referenceDescriptor2 = fullFaceDescription[0].descriptor;
      } else {
        setError('Face not detected in the second image.');
        setFullDesc2(null);
      }
    }
  };

  const handleCompare = () => {
    if (fullDesc && fullDesc2) {
      setError('');
      const faceMatcher = new faceapi.FaceMatcher(fullDesc);
      const bestMatch = faceMatcher.findBestMatch(fullDesc2);
      //const faceMatcher = new faceapi.FaceMatcher(referenceDescriptor);
      //const bestMatch = faceMatcher.findBestMatch(fullFaceDescription[1].descriptor);
      setResult(bestMatch.toString());
      console.log("bestMatch:",bestMatch, bestMatch.toString());
      if (bestMatch.label !== 'unknown') {
        // Display the best match
      } else {
          // Handle no match found
      }
    } else {
        setResult('');
        setError('Both images must be uploaded and detected.');
    }
  };

  return (
    <div className="container">
      <h2>Face Verification</h2>

      <div>
        <input type="file" ref={inputRef} onChange={handleImageUpload} />
        {image && <img src={image} alt="Uploaded Image 1" />}
      </div>

      <div>
        <input type="file" ref={inputRef2} onChange={handleImageUpload2} />
        {image2 && <img src={image2} alt="Uploaded Image 2" />}
      </div>

      <button onClick={handleCompare}>Compare Faces</button>
 
      {result && <p>Result: {result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* {fullDesc && fullDesc.length > 0 && <p>Face Detected</p>} */}
      {!isModelLoaded && <p>Loading Models...</p>}
    </div>
  );
};

export default FaceVerification;