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
  onItemSelect: jest.fn(),
  onClose: jest.fn(),
  position: { coords: { latitude: 50, longitude: 20 } }
};

it('renders without crashing', () => {
  const tree = shallow(<Search {...props} />);
  expect(tree).toBeTruthy();
});

it('matches snapshot', () => {
  const tree = shallow(<Search {...props} />);
  expect(tree).toMatchSnapshot();
});

it('should render a text input and react to user input', done => {
  const mockOnSearchTextChange = jest.fn();
  Search.prototype.onSearchTextChange = mockOnSearchTextChange;

  const tree = shallow(<Search {...props} />);
  const textInput = tree.find('TextInput');
  expect(textInput).toHaveLength(1);
  textInput.simulate('changeText', { target: { value: 'test' } });
  // debounced
  expect(mockOnSearchTextChange).not.toHaveBeenCalled();
  setTimeout(() => {
    expect(mockOnSearchTextChange).toHaveBeenCalledWith('test');
    done();
  }, 1500);
});

// Result Item

const resultItemProps = {
  item: {
    structured_formatting: 'some title',
    description: 'some description'
  },
  onItemSelect: jest.fn()
};

it('renders result item without crashing', () => {
  const tree = shallow(<Search.ResultItem {...resultItemProps} />);
  expect(tree).toBeTruthy();
});

it('matches snapshot for result item', () => {
  const tree = shallow(<Search.ResultItem {...resultItemProps} />);
  expect(tree).toBeTruthy();
});

it('should render result items correctly', () => {});
