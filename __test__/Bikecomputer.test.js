import React from 'react';
import Bikecomputer from '../components/Bikecomputer';

import renderer from 'react-test-renderer';

const props = {};

it('renders without crashing', () => {
  const rendered = renderer.create(<Bikecomputer {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
