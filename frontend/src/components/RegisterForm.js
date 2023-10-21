import { useState } from 'react';
import '../styles/LoginForm.css';

function RegisterForm({ close }) {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3001/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});
			
			const data = await response.json();
			
			if (data.userId) {
				alert("Registration successful!");
				close();
			} else {
				alert(data.error);
			}
		} catch (error) {
			console.error("Error registering:", error);
		}
	};

	return (
		<div className="popup">
			<div className="popup-content">
				<span className="close-btn" onClick={close}>X</span>
				<h2>Bienvenido a Examfy</h2>
				<form onSubmit={handleSubmit}>
					<label>
						Usuario:
						<input onChange={handleUsername} type="text" name="username" />
					</label>
					<label>
						Contraseña:
						<input onChange={handlePassword} type="password" name="password" />
					</label>
					<input type="submit" value="Registrarse" />
				</form>
			</div>
		</div>
	);
}

export default RegisterForm;
