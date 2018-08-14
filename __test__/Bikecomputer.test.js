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

it('matches snapshot with new props', () => {
  const tree = shallow(<Bikecomputer />);

  tree.setProps({
    speed: 20,
    altitude: 10
  });

  expect(tree.findWhere(item => item.text() === '72.0 km/h')).toHaveLength(1);
  expect(tree.findWhere(item => item.text() === '10.0 m')).toHaveLength(1);
});
