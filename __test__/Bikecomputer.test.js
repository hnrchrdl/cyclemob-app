import React from 'react';
import Bikecomputer from '../components/Bikecomputer';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Bikecomputer />).toJSON();
  expect(rendered).toBeTruthy();
});
