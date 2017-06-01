import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import create from './redux/create';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = create();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
