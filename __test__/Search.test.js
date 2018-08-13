import React from 'react';
import Search from '../components/Search';

import { shallow } from 'enzyme';

jest.mock('../lib/gmaps-api');
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

// it('should render a text input and react to user input', done => {
// const mockOnSearchTextChange = jest.fn();
// Search.prototype.onSearchTextChange = mockOnSearchTextChange;
// const tree = shallow(<Search {...props} />);
// const textInput = tree.find('TextInput');
// console.log(tree.debug());
// // textInput.get(0).value = 'testt';
// // textInput.simulate('changeText', { target: { value: 'test' } });
// textInput.simulate('changeText', { currentTarget: { value: 'test' } });
// // textInput.simulate('keyPress');
// // textInput.simulate('change');
// // debounced
// expect(mockOnSearchTextChange).not.toHaveBeenCalled();
// setTimeout(() => {
//   expect(mockOnSearchTextChange).toHaveBeenCalledWith('test');
//   done();
// }, 1500);
// });

it('should handle user input correctly', done => {
  const tree = shallow(<Search {...props} />);
  const instance = tree.instance();
  let state = instance.state;
  expect(state.sessionToken).toBeDefined();
  expect(tree.find('FlatList')).toHaveLength(0);
  expect(tree).toMatchSnapshot();

  instance.onSearchTextChange('test');
  setTimeout(() => {
    tree.update();
    state = instance.state;
    expect(state.result).toHaveLength(1);
    expect(tree.find('FlatList')).toHaveLength(1);
    expect(tree.find('FlatList').prop('data')).toMatchObject(state.result);
    expect(tree).toMatchSnapshot();
    done();
  });
});

it('should handle search result selection', done => {
  const tree = shallow(<Search {...props} />);
  tree.instance().onSearchResultSelect({ place_id: '12345' });
  setTimeout(() => {
    expect(props.onItemSelect).toHaveBeenCalledTimes(1);
    done();
  });
});

// Result Item

const resultItemProps = {
  item: {
    structured_formatting: {
      main_text: 'some text'
    },
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
  expect(tree).toMatchSnapshot();
});

it('should render result items correctly', () => {
  const tree = shallow(<Search.ResultItem {...resultItemProps} />);
  expect(
    tree
      .find('Text')
      .findWhere(
        item =>
          item.text() === resultItemProps.item.structured_formatting.main_text
      )
  ).toHaveLength(1);
  expect(
    tree
      .find('Text')
      .findWhere(item => item.text() === resultItemProps.item.description)
  ).toHaveLength(1);
});
it('should handle onPress events', () => {
  const tree = shallow(<Search.ResultItem {...resultItemProps} />);
  tree.simulate('press');
  expect(resultItemProps.onItemSelect).toHaveBeenCalledTimes(1);
});
