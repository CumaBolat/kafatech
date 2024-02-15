import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './css/hello.css';

function Hello() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/grades', { state: { name } });
  };

  return (
    <div className="welcome-page">
      <h1>Welcome to Cuma Bolat's Kafa-Tech Test Case!</h1>
      <p>Please enter your name:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Hello;