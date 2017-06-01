import {createStore} from 'redux';
import reducer from './modules/reducer';
import {client} from './middleware';

const create = preloadedState => createStore(
    reducer,
    preloadedState,
    client,
);

export default create;