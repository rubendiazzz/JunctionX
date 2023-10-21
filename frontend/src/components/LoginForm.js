import React from 'react';
import '../styles/LoginForm.css';

function LoginForm({ close }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-btn" onClick={close}>X</span>
                <h2>Bienvenido a Examfy</h2>
                <form>
                    <label>
                        Usuario:
                        <input type="text" name="username" />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="password" />
                    </label>
                    <input type="submit" value="Iniciar sesión" />
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
