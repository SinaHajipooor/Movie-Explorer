import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';  // for the usePopCorn app
import './quiz/index.css' // for the quiz app
// import App from './App';  // for the usePopCorn app
import App from './quiz/App' // for the quiz app


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

