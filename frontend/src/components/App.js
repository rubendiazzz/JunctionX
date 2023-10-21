import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../styles/App.css';

function App() {
    return (
        <div>
            <h1>Bienvenido a Examfy</h1>
            <LoginForm />
            <RegisterForm />
        </div>
    );
}

export default App;
