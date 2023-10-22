import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
                <h1>Examfy</h1>
                { isLoggedIn ? (
                    <div>
                        <button onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}>Settings</button>
                        {showSettingsDropdown && (
                            <div className="settings-dropdown">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setShowLogin(true)}>Log In</button>
                        <button onClick={() => setShowRegister(true)}>Sign Up</button>
                    </div>
                )}
            </div>
            {showLogin && 
                <div className="overlay">
                    <LoginForm close={() => setShowLogin(false)} setIsLoggedIn={setIsLoggedIn} />
                </div>
            }
            {showRegister && 
                <div className="overlay">
                    <RegisterForm close={() => setShowRegister(false)} />
                </div>
            }
        </div>
    );
}

export default Navbar;
