// src/Components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/notfound.css';

const NotFound = () => (
  <div className="notfound-container">
    <h1>404 - Page Not Found</h1>
    <Link to="/" className="btn btn-info mt-3">Go Back Home</Link>
  </div>
);

export default NotFound;