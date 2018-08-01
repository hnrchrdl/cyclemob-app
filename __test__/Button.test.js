import React from 'react';
import Button from '../components/Button';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Button />).toJSON();
  expect(rendered).toBeTruthy();
});
