# FaceAPI Verification Project

This project demonstrates face verification and face expression recognition using [React](https://react.dev/) and [face-api.js](https://github.com/justadudewhohacks/face-api.js/blob/master/README.md). The application allows users to upload images and compare facial features, as well as capture live video using a webcam to detect facial expressions.

## **[Click me for Live Demo!](https://fordragondev.github.io/face-verification/)**

## Features
- **Face Verification**: Upload two images and compare the faces to determine if they match.
- **Facial Expression Recognition**: Capture a live video feed from a webcam and detect facial expressions in real-time.

## Main Components

### 1. `FaceVerification.js`
This component handles face verification by allowing the user to upload two images and compare their facial descriptors. It utilizes [face-api.js](https://github.com/justadudewhohacks/face-api.js/blob/master/README.md) to detect faces and compare descriptors to find the best match.

- **Usage Example:**
  - Upload two images, and the app will detect faces in both and compare them.
  - If the faces match, the result will display the match details.
  - If no match is found or faces are not detected, it will show an appropriate error message.

### 2. `WebcamFaceExpression.js`
This component uses a webcam feed to detect facial expressions in real-time. The user can capture a screenshot from the video stream and recognize facial expressions like happiness, sadness, anger, and more.

- **Usage Example:**
  - Start the webcam, and the app will display the current facial expression on the screen.
  - The expression is updated after capturing a frame from the webcam feed.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/face-verification-app.git
   cd face-verification-app
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Download the [face-api.js](https://github.com/justadudewhohacks/face-api.js/blob/master/README.md) models place them in the /public/models directory of the project.
4. Start the app:
    ```bash
    npm start
    Open http://localhost:3000 in your browser to view the app.
    ```
## Technologies Used
`React`: Front-end framework used to build the app.
`face-api.js`: JavaScript API for face recognition and detection.
`react-webcam`: Library used to access and capture images from the webcam.

## File Structure
```bash
src/
  ├── components/
  │   ├── FaceVerification.js  # Handles face comparison using uploaded images.
  │   ├── WebcamFaceExpression.js  # Handles facial expression detection from webcam.
  ├── FaceApi.js  # Utility file for loading face-api.js models and extracting face descriptors.
  ├── App.js  # Main application component that combines face verification and webcam expression detection.
  ├── App.css  # Styling for the app.
public/
  ├── models/  # Directory where face-api.js models are stored.
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Autor

**Andrés Echeverría**  
Fordragon Dev Company.