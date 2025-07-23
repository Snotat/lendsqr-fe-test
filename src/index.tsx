import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <BrowserRouter>
     
     <Toaster expand visibleToasts={2} closeButton={true} position="top-center" toastOptions={{
      style: {
        backdropFilter: "6px",
        background: "linear-gradient(to left bottom, rgba(0, 224, 228, 1), rgba(0, 41, 123, 1))",
        border: "1px solid rgba(255, 255, 255, 0.7)",
        borderRight: "1px solid rgba(0, 0, 0, 0.6)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
        borderRadius: "10px",
        boxShadow: "10px 16px 50px rgba(0, 0, 0, 0.8)",
        fontSize: '16px',
        fontWeight: "600",
        color:'white'
      },
    }} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


