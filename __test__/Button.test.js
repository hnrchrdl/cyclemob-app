import React from 'react';
import Button from '../components/Button';

import { shallow } from 'enzyme';

const props = {
  onPress: jest.fn(),
  iconName: 'search'
};
it('renders without crashing', () => {
  const tree = shallow(<Button {...props} />);
  expect(tree).toBeTruthy();
});
it('matches snapshot', () => {
  const tree = shallow(<Button {...props} />);
  expect(tree).toMatchSnapshot();
});
it('handles callback on press', () => {
  const tree = shallow(<Button {...props} />);
  tree.simulate('press');
  expect(props.onPress).toBeCalled();
});
