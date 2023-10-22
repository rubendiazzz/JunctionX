import React, { useState, useEffect } from 'react';  // Import useEffect
import '../styles/LoginForm.css';

function LoginForm({ close, setIsLoggedIn, isLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // This useEffect will run whenever isLoggedIn changes
    useEffect(() => {
        console.log("User is logged in:", isLoggedIn);
    }, [isLoggedIn]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
        
            const data = await response.json();
        
            if (data.message) {
                alert(data.message);
                close();
                setIsLoggedIn(true);
				console.log("User ID set in session:", data.session.userId);  // Añadir este log
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-btn" onClick={close}>X</span>
                <h2>Bienvenido a Examfy</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Usuario:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                    </label>
                    <input type="submit" value="Iniciar sesión" />
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
