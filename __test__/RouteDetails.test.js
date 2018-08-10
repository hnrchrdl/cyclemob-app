import React from 'react';
import { shallow } from 'enzyme';
import RouteDetails from '../components/RouteDetails';

const props = {
  distance: 100,
  duration: 40,
  onClose: jest.fn(),
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

it('handles close button presses', () => {
  const tree = shallow(<RouteDetails {...props} />);
  tree
    .find('Button')
    .find({ iconName: 'close' })
    .simulate('press');
  expect(props.onClose).toHaveBeenCalledTimes(1);
});

// it('handles remove button presses', () => {
//     const tree = shallow(<RouteDetails {...props} />);
//     tree
//       .find('Button')
//       .find({ iconName: 'close' })
//       .simulate('press');
//     expect(props.onClose).toHaveBeenCalledTimes(1);
//   });
