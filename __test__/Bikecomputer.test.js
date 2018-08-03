import React from 'react';
import Bikecomputer from '../components/Bikecomputer';

import { shallow } from 'enzyme';

const props = {};

it('renders without crashing', () => {
  const tree = shallow(<Bikecomputer {...props} />);
  expect(tree).toBeTruthy();
});
it('matches snapshot', () => {
  const tree = shallow(<Bikecomputer {...props} />);
  expect(tree).toMatchSnapshot();
});
