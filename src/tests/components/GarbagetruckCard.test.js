import React from 'react';
import { shallow } from 'enzyme';
import GarbagetruckCard from '../../components/GarbagetruckCard';
import garbagetrucks from '../fixtures/garbagetrucks';

test('should render the GarbagetruckCard', () => {
    const wrapper = shallow(<GarbagetruckCard garbagetruck={garbagetrucks[0]} />);
    expect(wrapper).toMatchSnapshot();
});