import React from 'react';
import { shallow } from 'enzyme';
import CirclePercent from '../../components/CirclePercent';

test('should render the CirclePercent', () => {
    const wrapper = shallow(<CirclePercent />);
    expect(wrapper).toMatchSnapshot();
});