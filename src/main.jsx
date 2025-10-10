import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';



const CLIENT_ID = "463368016297-ddknlfrh7pu4h6rvc75vms6bcv9ebce2.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root')).render(
 // <React.StrictMode>
 <GoogleOAuthProvider clientId={CLIENT_ID}>
   

    <App />
    </GoogleOAuthProvider>
 // </React.StrictMode>
);
