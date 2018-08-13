import React from 'react';
import { shallow } from 'enzyme';
import MarkerDetails from '../components/MarkerDetails';

const props = {
  marker: {
    id: '123',
    title: 'title',
    description: 'desc',
    coordinates: {
      latitude: 55.5,
      longitude: 11.1
    }
  },
  onSetAsTarget: jest.fn(),
  onSetAsWaypoint: jest.fn(),
  onClose: jest.fn(),
  onRemove: jest.fn()
};

it('renders without crashing', () => {
  const tree = shallow(<MarkerDetails {...props} />);
  expect(tree).toBeTruthy();
});

it('matches snapshot', () => {
  const tree = shallow(<MarkerDetails {...props} />);
  expect(tree).toMatchSnapshot();
});

it('reacts to marker changes', () => {
  const tree = shallow(<MarkerDetails {...props} />);
  tree.setProps({
    marker: {
      id: '12',
      title: 'title 2',
      description: 'desc 2',
      coordinates: {
        latitude: 56.6,
        longitude: 12.2
      }
    }
  });
  expect(tree).toMatchSnapshot();
});

it('handles close button presses', () => {
  const tree = shallow(<MarkerDetails {...props} />);
  tree
    .find('Button')
    .find({ iconName: 'arrow-back' })
    .simulate('press');
  expect(props.onClose).toHaveBeenCalledTimes(1);
});

it('handles remove button presses', () => {
  const tree = shallow(<MarkerDetails {...props} />);
  tree
    .find('Button')
    .find({ iconName: 'location-off' })
    .simulate('press');
  expect(props.onRemove).toHaveBeenCalledTimes(1);
});

it('handles set as target button presses', () => {
  const tree = shallow(<MarkerDetails {...props} />);
  tree
    .find('Button')
    .find({ iconName: 'directions' })
    .simulate('press');
  expect(props.onSetAsTarget).toHaveBeenCalledTimes(1);
});
