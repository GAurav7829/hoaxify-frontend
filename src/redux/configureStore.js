import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = (addLogger = true) => {
    const middleware = addLogger ? applyMiddleware(logger, thunk) : applyMiddleware(thunk);
    return createStore(authReducer, middleware);
}

export default configureStore;
