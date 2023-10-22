import React from 'react';

const ImageView = ({ imageUrl }) => {
    if (!imageUrl) return null;

    return (
        <div>
            <img src={imageUrl} alt="Imagen cargada" />
        </div>
    );
};

export default ImageView;
