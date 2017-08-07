import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer = applyMiddleware(thunkMiddleware, createLogger())

const devStore = createStore(
    rootReducer,
    composeWithDevTools(
        enhancer
    )
)

const prodStore = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
)

let appStore;

if (process.env.NODE_ENV === 'production'){
    appStore = prodStore;
} else {
    appStore = devStore;
}

export default appStore;
