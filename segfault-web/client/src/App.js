import React, { useState } from 'react';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={isLoggedIn ? "container-logged-in" : "container"}>
      {isLoggedIn ? (
        <Dashboard onLogout={logout} />
      ) : (
        <div className="login-box">
          <h1>Login</h1>
          <input type="text" className="login-input" placeholder="Username" />
          <input type="password" className="login-input" placeholder="Password" />
          <button className="login-button" onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
