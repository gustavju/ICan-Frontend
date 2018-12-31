import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import trashcansReducer from '../reducers/trashcan';
import garbagetrucksReducer from '../reducers/garbagetruck';


const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            trashcans: trashcansReducer,
            garbagetrucks: garbagetrucksReducer,
        }),
        composeEnchancers(applyMiddleware(thunk))
    );
    return store;
}

