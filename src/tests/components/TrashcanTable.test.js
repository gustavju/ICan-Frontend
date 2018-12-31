import React from 'react';
import { shallow } from 'enzyme';
import TrashcanTable from '../../components/TrashcanTable';
import trashcans from '../fixtures/trashcans';

test('should render the TrashcanTable', () => {
    const wrapper = shallow(<TrashcanTable trashcans={trashcans} />);
    expect(wrapper).toMatchSnapshot();
});