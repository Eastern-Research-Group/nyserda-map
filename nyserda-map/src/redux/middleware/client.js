import {applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import logger from './logger';

const composeEnhancers = (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

let devMidleware = [];
if (process.env.NODE_ENV !== 'production') {
    devMidleware = [
        // logger,
    ];
}

const client = applyMiddleware(
    reduxThunk,
    ...devMidleware,
);

export default composeEnhancers(client);