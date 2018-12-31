import React from 'react';
import { shallow } from 'enzyme';
import Trashcan from '../../components/Trashcan';
import traschcans from '../fixtures/trashcans';

test('should render the Trashcan', () => {
    const wrapper = shallow(<Trashcan trashcan={traschcans[0]} />);
    expect(wrapper).toMatchSnapshot();
});