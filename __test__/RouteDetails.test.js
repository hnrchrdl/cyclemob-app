import React from 'react';
import { shallow } from 'enzyme';
import RouteDetails from '../components/RouteDetails';

const props = {
  distance: 100,
  duration: 40,
  onRemove: jest.fn()
};

it('renders without crashing', () => {
  const tree = shallow(<RouteDetails {...props} />);
  expect(tree).toBeTruthy();
});

it('matches snapshot', () => {
  const tree = shallow(<RouteDetails {...props} />);
  expect(tree).toMatchSnapshot();
});

it('reacts to marker changes', () => {
  const tree = shallow(<RouteDetails {...props} />);
  tree.setProps({
    distance: 150,
    duration: 10
  });
  expect(tree).toMatchSnapshot();
});

it('handles remove button presses', () => {
  const tree = shallow(<RouteDetails {...props} />);
  tree.simulate('press');
  expect(props.onRemove).toHaveBeenCalledTimes(1);
});
