import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let wrapper = <Header />;

test('should render Header correctly', () => {
    expect(wrapper).toMatchSnapshot();
});