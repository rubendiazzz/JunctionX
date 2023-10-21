import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

  const ImageShare = ({ match }) => {
    const image = atob(match.params.image); // decode the base64 URL back to original
    return <img src={image} alt="Shared" />;
  };

  return (
    <Router>
      <Switch>
        <Route path="/share/:image" component={ImageShare} />
        <Route path="/">
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
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
