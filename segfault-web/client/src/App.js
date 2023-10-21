import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import ImageShare from './ImageShare';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Routes>
        <Route path="/share/:image" element={<ImageShare />} />
        <Route path="/" element={
          <>
            <div className={isLoggedIn ? "container-logged-in" : "container"}>
              {isLoggedIn ? <Dashboard onLogout={logout} /> : (
                <div className="login-box">
                  <h1>Login</h1>
                  <input type="text" className="login-input" placeholder="Username" />
                  <input type="password" className="login-input" placeholder="Password" />
                  <button className="login-button" onClick={login}>Login</button>
                </div>
              )}
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
