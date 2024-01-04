import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TaskContextProvider } from './contexts/taskContext';
import { ProfileContextProvider } from './contexts/profileContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProfileContextProvider>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
    </ProfileContextProvider>
  </React.StrictMode>
);

