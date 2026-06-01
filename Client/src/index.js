import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import paperIcon from './images/paper.png';

const faviconTag = document.getElementById('meu-favicon');
if (faviconTag) {
  faviconTag.href = paperIcon;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);