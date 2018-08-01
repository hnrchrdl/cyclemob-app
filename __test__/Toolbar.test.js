import React from 'react';
import Toolbar from '../components/Toolbar';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Toolbar />).toJSON();
  expect(rendered).toBeTruthy();
});
