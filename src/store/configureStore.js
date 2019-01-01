import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import trashcansReducer from '../reducers/trashcan';
import garbagetrucksReducer from '../reducers/garbagetruck';
import routeReducer from '../reducers/route';


const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            trashcans: trashcansReducer,
            garbagetrucks: garbagetrucksReducer,
            route: routeReducer,
        }),
        composeEnchancers(applyMiddleware(thunk))
    );
    return store;
}

