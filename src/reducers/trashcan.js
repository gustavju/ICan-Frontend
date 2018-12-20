const trashcanReducerDefaultState = {
    trashcans: []
};

export default (state = trashcanReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TRASHCANS':
            return action.trashcans;
        default:
            return state;
    }
};