import React, { useState } from 'react';
import './App.css';
import LinkForm from './LinkForm';

const ImageModal = ({ image, onClose }) => {
  const [shareLinks, setShareLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleLinkCreation = (formData) => {
    const newLink = `${window.location.origin}/share?image=${encodeURIComponent(image)}`;
    setShareLinks([...shareLinks, newLink]);
    setShowForm(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={image} alt="Selected" className="modal-image" />
        <div className="share-links">
          {showForm ? (
            <div className="link-form-popup">
              <LinkForm onSubmit={handleLinkCreation} />
            </div>
          ) : (
            <button onClick={() => setShowForm(true)}>Crear Enlace</button>
          )}
          {shareLinks.map((link, index) => (
            <a key={index} href={link} target="_blank" rel="noreferrer">Enlace {index + 1}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
