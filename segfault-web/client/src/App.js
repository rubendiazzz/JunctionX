import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      setImage(res.data.image);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      {image && <img src={image} alt="User" />}
    </div>
  );
}

export default App;
