import React from 'react';
import { shallow } from 'enzyme';
import Button from '../components/Button';

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
  tree.contains(<span />);
});

it('handles callback on press', () => {
  const tree = shallow(<Button {...props} />);
  tree.simulate('press');
  expect(props.onPress).toBeCalled();
});

it('renders the passed icon', () => {
  const tree = shallow(<Button {...props} />);
  expect(tree.find('Icon')).toBeTruthy();
  expect(tree.find('Icon').prop('name')).toBe(props.iconName);
});
