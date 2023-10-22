import React, { useState } from 'react';
import Navbar from './Navbar';
import '../styles/App.css';
import ImageUpload from './ImageUpload';
import ImageGallery from './ImageGallery';

function App() {
	const [serverResponse, setServerResponse] = useState(null);
	const [images, setImages] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleUpload = async (uploadedImageUrl) => {
		const SERVER_ADDRESS = "http://localhost:3001";
		const fullImageUrl = `${SERVER_ADDRESS}/${uploadedImageUrl}`;
		setImages(prevImages => [...prevImages, fullImageUrl]);

		try {
			// Enviar la URL de la imagen al servidor
			let response = await fetch('http://localhost:3001/process-image', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ imageUrl: uploadedImageUrl })
			});

			let data = await response.json();

			// Mostrar la respuesta en la página
			setServerResponse(data.message);
		} catch (error) {
			console.error("Hubo un error al procesar la imagen:", error);
			setServerResponse("Error al procesar la imagen. Por favor, intenta de nuevo.");
		}
	};

	return (
		<>
			<div className="App">
				{isLoggedIn && 
					<div className="upload-container">
						<ImageUpload onUpload={handleUpload} />
					</div>
				}
				<ImageGallery images={images} />
				{serverResponse && <div className="server-response">{serverResponse}</div>}
			</div>
			<div>
				<h1>Bienvenido a Examfy</h1>
				<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			</div>
		</>
	);
}

export default App;
