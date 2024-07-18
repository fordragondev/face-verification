import logo from './logo.svg';
import './App.css';

import FaceVerification from './FaceVerification';
import WebcamFaceExpression from './WebcamFaceExpression';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Face Verification App</h1>
      </header>
      <div className="App-content">
        <FaceVerification />
      </div>
      <WebcamFaceExpression />
    </div>
  );
}

export default App;
