const garbagetruckReducerDefaultState = {
    garbagetrucks: []
};

export default (state = garbagetruckReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_GARBAGETRUCKS':
            return action.garbagetrucks;
        default:
            return state;
    }
};