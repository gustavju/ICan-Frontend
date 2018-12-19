import authReducer from '../../reducers/auth';

test(('should add the uid to state'), () => {
    const action = {
        type: 'LOGIN',
        uid: 'test-uid-1234'
    }
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test(('should remove the uid from state'), () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid: 'test-uid-1234' }, action);
    expect(state).toEqual({});
});