import React from 'react';
import { shallow } from 'enzyme';
import TrashcanTableRow from '../../components/TrashcanTableRow';
import trashcans from '../fixtures/trashcans';


test('should render the TrashcanTableRow', () => {
    const wrapper = shallow(<TrashcanTableRow trashcan={trashcans[0]} />);
    expect(wrapper).toMatchSnapshot();
});