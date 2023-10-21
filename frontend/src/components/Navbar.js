import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="navbar">
            <div className="navbar-content">
                <h1>Examfy</h1>
                <div>
                    <button onClick={() => setShowLogin(true)}>Iniciar sesión</button>
                    <button onClick={() => setShowRegister(true)}>Registrarse</button>
                </div>
            </div>
            {showLogin && <LoginForm close={() => setShowLogin(false)} />}
            {showRegister && <RegisterForm close={() => setShowRegister(false)} />}
        </div>
    );
}

export default Navbar;
