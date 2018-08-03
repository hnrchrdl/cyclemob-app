import React from 'react';
import Toolbar from '../components/Toolbar';

import { shallow } from 'enzyme';

const props = {
  onToggleShowSearch: () => {},
  onToggleUserLocation: () => {},
  onToggleShowBikecomputer: () => {},
  onToggleShowMenu: () => {},
  followUserLocation: false
};
it('renders without crashing', () => {
  const tree = shallow(<Toolbar {...props} />);
  expect(tree).toBeTruthy();
});
it('matches snapshot', () => {
  const tree = shallow(<Toolbar {...props} />);
  expect(tree).toMatchSnapshot();
});
