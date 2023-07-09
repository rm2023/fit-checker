import React, { useState } from 'react';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';

function App() {
  const [showSignUpOptions, setShowSignUpOptions] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUpOptions(true);
  };

  return (
    <div className="App">
      <Login />
      {!showSignUpOptions ? (
        <button onClick={handleSignUpClick}>Sign Up</button>
      ) : (
        <SignUp />
      )}
    </div>
  );
}

export default App;