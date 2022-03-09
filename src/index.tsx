import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// 認証周りやDB周りで必要なためimportしておく
import 'firebase/auth';
import 'firebase/database';



ReactDOM.render(
  <React.StrictMode>
    <App />



  </React.StrictMode>,
  document.getElementById('root')
);


