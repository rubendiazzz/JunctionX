import React from 'react';

function ImageGallery({ images }) {
    return (
        <div className="image-gallery">
            {images.map((url, index) => (
                <div key={index} className="image-container">
                    <img src={url} alt={`Uploaded ${index}`} />
                </div>
            ))}
        </div>
    );
}

export default ImageGallery;
