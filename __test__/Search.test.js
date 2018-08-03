import React from 'react';
import Search from '../components/Search';

import renderer from 'react-test-renderer';

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
  onClose: () => {}
};

it('renders without crashing', () => {
  const rendered = renderer.create(<Search {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
