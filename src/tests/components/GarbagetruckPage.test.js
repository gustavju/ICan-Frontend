import React from 'react';
import { shallow } from 'enzyme';
import { GarbagetruckPage } from '../../components/GarbagetruckPage';
import garbagetrucks from '../fixtures/garbagetrucks';
import trashcans from '../fixtures/trashcans';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<GarbagetruckPage garbagetrucks={garbagetrucks} trashcans={trashcans}/>);
});

test('should render the GarbagetruckPage', () => {
    expect(wrapper).toMatchSnapshot();
});