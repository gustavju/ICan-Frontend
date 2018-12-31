import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../components/DashboardPage';
import trashcans from '../fixtures/trashcans';


test('should render the dashboardpage', () => {
    const wrapper = shallow(<DashboardPage trashcans={trashcans} />);
    expect(wrapper).toMatchSnapshot();
});