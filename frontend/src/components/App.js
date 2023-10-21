import React, { useState } from 'react';
import Navbar from './Navbar';
import '../styles/App.css';
import ImageUpload from './ImageUpload';

function App() {
    const [serverResponse, setServerResponse] = useState(null);

    const handleUpload = async (imageUrl) => {
        console.log("Imagen subida en:", imageUrl);

        try {
            // Enviar la URL de la imagen al servidor
            let response = await fetch('http://localhost:3001/process-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl: imageUrl })
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
                <ImageUpload onUpload={handleUpload} />
                {serverResponse && <div className="server-response">{serverResponse}</div>}
            </div>
            <div>
                <h1>Bienvenido a Examfy</h1>
                <Navbar />
            </div>
        </>
    );
}

export default App;

