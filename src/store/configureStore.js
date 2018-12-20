import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import trashcansReducer from '../reducers/trashcan';


const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            trashcans: trashcansReducer,
        }),
        composeEnchancers(applyMiddleware(thunk))
    );
    return store;
}

