import { applyMiddleware, createStore, combineReducers } from 'redux';
import demo from './reducers/demoReducer.js';
import business from './reducers/businessReducer.js';

const reducer = combineReducers({
    demo,
    business
});

const store = createStore(reducer);

export default store;