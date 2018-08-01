import React from 'react';
import Map from '../components/Map';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Map />).toJSON();
  expect(rendered).toBeNull();
});
