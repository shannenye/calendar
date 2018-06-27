import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import events from './events';

const reducer = combineReducers({ events });

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware, createLogger
));
const store = createStore(reducer, middleware);

export default store;