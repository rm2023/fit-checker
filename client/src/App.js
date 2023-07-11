import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <>
    <Router>
      <Routes>
        
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        
        </Routes>
        </Router>
    </>
  )
}


export default App;