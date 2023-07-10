import React, { useState } from 'react';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  return (
    <div className="App">
      {showSignUp ? (
        <SignUp />
      ) : (
        <>
          <Login />
          <button onClick={handleSignUpClick}>Sign Up</button>
        </>
      )}
    </div>
  );
}

export default App;