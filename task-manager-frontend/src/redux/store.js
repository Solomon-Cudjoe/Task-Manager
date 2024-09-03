import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { noteReducer } from './noteReducer';

const store = createStore(noteReducer, applyMiddleware(thunk));

export default store;