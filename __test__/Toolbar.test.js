import React from 'react';
import Toolbar from '../components/Toolbar';

import { shallow } from 'enzyme';

const props = {
  onToggleShowSearch: jest.fn(),
  onToggleUserLocation: jest.fn(),
  onToggleShowBikecomputer: jest.fn(),
  onToggleShowMenu: jest.fn(),
  followUserLocation: false
};

it('renders without crashing', () => {
  const tree = shallow(<Toolbar {...props} />);
  expect(tree).toBeTruthy();
});

it('matches snapshot', () => {
  const tree = shallow(<Toolbar {...props} />);
  expect(tree).toMatchSnapshot();
});

it('should call correct callbacks on clicks', () => {
  const tree = shallow(<Toolbar {...props} />);
  tree
    .findWhere(item => item.prop('name') === 'search')
    .parent()
    .simulate('press');
  expect(props.onToggleShowSearch).toHaveBeenCalled();

  tree
    .findWhere(item => item.prop('name') === 'center-focus-strong')
    .parent()
    .simulate('press');
  expect(props.onToggleUserLocation).toHaveBeenCalled();

  tree
    .findWhere(item => item.prop('name') === 'menu')
    .parent()
    .simulate('press');
  expect(props.onToggleShowMenu).toHaveBeenCalled();
});

it('should render follow User Button with correct state', () => {
  const tree = shallow(<Toolbar {...props} />);
  expect(
    tree
      .findWhere(item => item.prop('name') === 'center-focus-strong')
      .prop('style').color
  ).not.toBeDefined();

  tree.setProps({ followUserLocation: true });

  expect(
    tree
      .findWhere(item => item.prop('name') === 'center-focus-strong')
      .prop('style').color
  ).toEqual('tomato');
});
