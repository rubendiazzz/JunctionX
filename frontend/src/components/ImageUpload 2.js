import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData);
            onUpload(response.data.imageUrl);
        } catch (error) {
            console.error('Error al subir la imagen', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Subir Imagen</button>
            </form>
        </div>
    );
};

export default ImageUpload;

