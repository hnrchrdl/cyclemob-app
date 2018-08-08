import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Button from './Button';
import PropTypes from 'prop-types';
import { getPlacesAutocomplete, getPlaceDetails } from '../lib/gmaps-api';
import { createUUID } from '../lib/helper';
import { debounce } from 'lodash';

class Search extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      result: [],
      sessionToken: createUUID()
    };
  }
  static propTypes = {
    position: PropTypes.shape({
      coords: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        speed: PropTypes.number,
        accuracy: PropTypes.number,
        altitude: PropTypes.number,
        heading: PropTypes.number
      }),
      mocked: PropTypes.bool,
      timestamp: PropTypes.number
    }).isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };
  static ResultItem = ResultItem;

  onSearchTextChange = input => {
    if (input.length === 0) {
      this.setState({
        sessionToken: createUUID()
      });
    } else {
      const location = this.props.position.coords;
      getPlacesAutocomplete(input, location, this.state.sessionToken).then(
        data => {
          this.setState({ result: data });
        }
      );
    }
  };

  onSearchResultSelect = item => {
    const { place_id } = item;
    getPlaceDetails(place_id, this.state.sessionToken).then(result => {
      this.props.onItemSelect(result);
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={{ flex: 1 }}>
            <TextInput
              autoFocus
              style={styles.textInput}
              placeholder="City / POI"
              onChangeText={debounce(this.onSearchTextChange, 800)}
            />
          </View>
          <View style={{ flex: 0 }}>
            <Button iconName="close" onPress={this.props.onClose} />
          </View>
        </View>
        {this.state.result.length > 0 && (
          <View style={styles.resultContainer}>
            <FlatList
              data={this.state.result}
              renderItem={({ item }) => (
                <Search.ResultItem
                  key={item.place_id}
                  item={item}
                  onItemSelect={this.onSearchResultSelect}
                />
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>
    );
  }
}

function ResultItem({ item, onItemSelect }) {
  return (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => onItemSelect(item)}
    >
      <Text style={styles.resultItemName}>{item.structured_formatting}</Text>
      <Text style={styles.resultItemVicinity}>{item.description}</Text>
    </TouchableOpacity>
  );
}

ResultItem.propTypes = {
  item: PropTypes.shape({
    structured_formatting: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onItemSelect: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    opacity: 0.95
  },
  inputContainer: {
    flexDirection: 'row'
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10
  },
  resultContainer: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    margin: 10
  },
  resultItem: {
    marginTop: 10,
    paddingTop: 10
  },
  resultItemName: {},
  resultItemVicinity: {
    color: '#ccc'
  }
});

export default Search;
