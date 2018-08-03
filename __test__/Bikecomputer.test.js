import React from 'react';
import Bikecomputer from '../components/Bikecomputer';

import { shallow } from 'enzyme';

let props = {};

it('renders without crashing', () => {
  const tree = shallow(<Bikecomputer {...props} />);
  expect(tree).toBeTruthy();
});

it('matches snapshots', () => {
  const tree = shallow(<Bikecomputer {...props} />);
  expect(tree).toMatchSnapshot();
});

props = {
  speed: 10,
  altitude: 10
};

it('matches snapshot with new props', () => {
  const tree = shallow(<Bikecomputer {...props} />);
  expect(tree).toMatchSnapshot();
});
