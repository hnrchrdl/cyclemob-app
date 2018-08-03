import React from 'react';
import Toolbar from '../components/Toolbar';

import renderer from 'react-test-renderer';

const props = {
  onToggleShowSearch: () => {},
  onToggleUserLocation: () => {},
  onToggleShowBikecomputer: () => {},
  onToggleShowMenu: () => {},
  followUserLocation: false
};
it('renders without crashing', () => {
  const rendered = renderer.create(<Toolbar {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
