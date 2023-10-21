import React, { useState } from 'react';
import ImageModal from './ImageModal';  // Importar el nuevo componente
import './App.css';

const Dashboard = ({ onLogout }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Imágenes de prueba
  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/250",
	"https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
    // Añada más imágenes aquí
  ];

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>Dashboard</h2>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </nav>
      <div className="image-gallery">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`img-${index}`} className="gallery-image" onClick={() => setSelectedImage(img)} />
        ))}
      </div>
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default Dashboard;
