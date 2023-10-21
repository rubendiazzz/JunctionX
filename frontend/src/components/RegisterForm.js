import {useState} from 'react';
import '../styles/LoginForm.css';  // Consider renaming this CSS to something more generic like "FormStyles.css"

function RegisterForm({ close }) {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const handlePassword = ({target}) => {
		setPassword(target.value);
	}

	const handleUsername = ({target}) => {
		setUsername(target.value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('submit');
		try {
		
			const data = await fetch('http://localhost:3001/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username, password})
			});
			const response = await data.json();
			console.log(response);
		} catch (error) {
			console.log(error);
		}
			
	}



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
