import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './auth0/Login';
import Prueba from './components/Menu Principal/menu_index'
import App from './App';
import reportWebVitals from './reportWebVitals';
import BarraS from './components/Componentes UI/BarraSuperior';
import BarraI from './components/Componentes UI/BarraInferior';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/*window.onunload = window.onbeforeunload = function(){
  return "Ud esta abandonando este sitio, su sesion se finalizara";
};*/

const domain = process.env.REACT_APP_AUTH_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH_CLIENT_ID!;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <BarraS />
      <App />
      <BarraI />
    </React.StrictMode>
  </Auth0Provider>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
