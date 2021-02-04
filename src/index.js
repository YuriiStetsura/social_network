import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from './components/app/app';
import store from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />  
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);




