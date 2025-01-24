import React from 'react'; // Import React for StrictMode
import ReactDOM from 'react-dom/client'; // Correct single import for createRoot
import { BrowserRouter } from 'react-router-dom'; // Router for navigation
import './index.css'; // Global styles
import App from './App.jsx'; // Main app component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
