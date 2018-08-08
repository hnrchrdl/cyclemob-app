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

it('should render data correctly with changed props', () => {
  const tree = shallow(<Bikecomputer {...props} />);

  expect(tree.findWhere(item => item.text() === '0 km/h')).toBeTruthy();
  expect(tree.findWhere(item => item.text() === '0 m')).toBeTruthy();

  tree.setProps({
    speed: 20,
    altitude: 10
  });
  expect(tree.findWhere(item => item.text() === '72 km/h')).toHaveLength(1);
  expect(tree.findWhere(item => item.text() === '10 m')).toHaveLength(1);
});
