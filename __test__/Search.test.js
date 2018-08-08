import React from 'react';
import Search from '../components/Search';

import { shallow } from 'enzyme';

jest.mock('TextInput', () => {
  const actualComponent = require.requireActual('TextInput');
  const React = require('React');
  class TextInput extends React.Component {
    render() {
      delete this.props.autoFocus;
      return React.createElement('TextInput', this.props, this.props.children);
    }
  }
  TextInput.propTypes = actualComponent.propTypes;
  return TextInput;
});

const props = {
  onItemSelect: () => {},
  onClose: () => {},
  position: { coords: { latitude: 50, longitude: 50 } }
};

it('renders without crashing', () => {
  const tree = shallow(<Search {...props} />);
  expect(tree).toBeTruthy();
});
it('matches snapshot', () => {
  const tree = shallow(<Search {...props} />);
  expect(tree).toMatchSnapshot();
});
