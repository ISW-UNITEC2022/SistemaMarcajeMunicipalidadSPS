import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './auth0/Login';
import Prueba from './components/menu_user_comp/menu_index'
import App from './App';
import reportWebVitals from './reportWebVitals';
import BarraS from './components/BarraSuperior';
import BarraI from './components/BarraInferior';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BarraS />
    <App />
    <BarraI />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
