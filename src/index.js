import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { localStorageKeys } from './constants/localStorageKeys';

localStorage.setItem(localStorageKeys.login, 'login')
localStorage.setItem(localStorageKeys.password, '0000')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
