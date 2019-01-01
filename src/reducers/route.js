const routeReducerDefaultState = {
    route: ''
};

export default (state = routeReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ROUTE':
            return action.route;
        default:
            return state;
    }
};