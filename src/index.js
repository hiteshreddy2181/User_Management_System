import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppProvider from './Context/AppProvider';
import { RoleProvider } from './Context/RoleContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AppProvider>
    <RoleProvider>
        <App />
    </RoleProvider>
      </AppProvider>
  </React.StrictMode>
);

