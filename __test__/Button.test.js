import React from 'react';
import Button from '../components/Button';

import renderer from 'react-test-renderer';

const props = {
  onPress: () => {},
  iconName: 'search'
};
it('renders without crashing', () => {
  const rendered = renderer.create(<Button {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
