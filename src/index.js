import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/userContext';
import { LoginProvider } from './context/loginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <UserProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();