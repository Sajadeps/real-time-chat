import { createStore, combineReducers } from 'redux';
import { chatReducer } from './reducer';

const rootReducer = combineReducers({
  chat: chatReducer
});

export const store = createStore(rootReducer);
