import React from 'react';
import { shallow } from 'enzyme';
import { TrashcanButton } from '../../components/TrashcanButton';

test('should render the TrashcanButton', () => {
    const wrapper = shallow(<TrashcanButton trashcanId="trashcanId" command="empty" />);
    expect(wrapper).toMatchSnapshot();
});