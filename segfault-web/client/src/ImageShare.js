import React from 'react';
import { useLocation } from 'react-router-dom';

const ImageShare = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const image = params.get('image');

  return (
    <div>
      <h1>Shared Image</h1>
      <img src={image} alt="Shared" />
    </div>
  );
};

export default ImageShare;
