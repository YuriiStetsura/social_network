import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/app/app';
import state from './redux/state';
import {rerenderEntireTree} from './render';


rerenderEntireTree(state);



