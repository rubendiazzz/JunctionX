import React, { useState } from 'react';

const LinkForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        placeholder="Nombre" 
        value={formData.name} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        name="relation" 
        placeholder="Relación Familiar" 
        value={formData.relation} 
        onChange={handleChange} 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Correo Electrónico" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <button type="submit">Crear Enlace</button>
    </form>
  );
};

export default LinkForm;
