import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Base CSS
import './index.css';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');
rootElement.addEventListener('contextmenu', (e) => e.preventDefault());

const root = ReactDOM.createRoot(rootElement);
root.render(
  <App />
);