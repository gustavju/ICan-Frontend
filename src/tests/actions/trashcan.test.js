import { setTrashcans } from '../../actions/trashcan';

test('should create a trashcans action object', () => {
    const trashcans = '[]';
    expect(setTrashcans(trashcans)).toEqual({
        type: 'SET_TRASHCANS',
        trashcans
    });
})