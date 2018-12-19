import {login, logout} from '../../actions/auth';

test('should create a login action object', () => {
    const uid = 'test-uid-1234';
    expect(login(uid)).toEqual({
        type: 'LOGIN',
        uid
    });
})

test('should create a logout action object', () => {
    expect(logout()).toEqual({
        type: 'LOGOUT'
    });
})