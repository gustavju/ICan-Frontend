import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from '../../components/PageHeader';

test('should render the PageHeader', () => {
    const wrapper = shallow(<PageHeader title="title" subTitle="subTitle" data="1" />);
    expect(wrapper).toMatchSnapshot();
});