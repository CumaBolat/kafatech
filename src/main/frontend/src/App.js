import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hello from './pages/hello/hello.js';
import Grades from './pages/grades/grades.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Hello/>} />
        <Route path="/grades" element={<Grades />} />
      </Routes>
    </Router>
  );
}

export default App;
