import React from 'react';
import App from '../App';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const tree = shallow(<App />);
  expect(tree).toBeTruthy();
});
it('matches snapshot', () => {
  const tree = shallow(<App />);
  expect(tree).toMatchSnapshot();
});
