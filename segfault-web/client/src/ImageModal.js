import React, { useState } from 'react';
import './App.css';

const ImageModal = ({ image, onClose }) => {
  const [shareLinks, setShareLinks] = useState([]);

  const createShareLink = () => {
    const newLink = window.location.origin + '/share/' + btoa(image); // codificar la URL de la imagen en base64
    setShareLinks([...shareLinks, newLink]);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={image} alt="Selected" className="modal-image" />
        <div className="share-links">
          <button onClick={createShareLink}>Crear enlace</button>
          {shareLinks.map((link, index) => (
            <a key={index} href={link} target="_blank" rel="noreferrer">Enlace {index + 1}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
