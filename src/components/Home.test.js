import React from 'react';
import { shallow } from 'enzyme';
import "../setupTests"
import Home from './Home';

it('renders welcome message', () => {
  const wrapper = shallow(<Home />);
  const welcome = <div className="Home"></div>
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});