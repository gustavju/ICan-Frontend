import { setGarbagetrucks } from '../../actions/garbagetruck';

test('should create a setGarbagetruck action object', () => {
    const garbagetrucks = '[]';
    expect(setGarbagetrucks(garbagetrucks)).toEqual({
        type: 'SET_GARBAGETRUCKS',
        garbagetrucks
    });
})