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
import {
  saveRecentSearchResult,
  getRecentSearchResults,
  clearRecentSearchResults
} from '../lib/persister';
import { debounce } from 'lodash';
import { MaterialIcons } from '@expo/vector-icons';

class Search extends React.PureComponent {
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

  constructor() {
    super();
    this.state = {
      result: [],
      recentSearchResults: [],
      sessionToken: createUUID()
    };
  }

  componentDidMount() {
    getRecentSearchResults().then(recentSearchResults => {
      this.setState({
        recentSearchResults
      });
    });
  }

  onSearchTextChange = input => {
    const location = this.props.position.coords;
    getPlacesAutocomplete(input, location, this.state.sessionToken).then(
      data => {
        this.setState({ result: data });
      }
    );
  };

  onSearchResultSelect = item => {
    const { place_id } = item;
    getPlaceDetails(place_id, this.state.sessionToken).then(result => {
      this.props.onItemSelect(result);
    });
    saveRecentSearchResult(item);
  };
  clearRecentSearchResults = () => {
    this.setState({
      recentSearchResults: []
    });
    clearRecentSearchResults();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={{ flex: 0, justifyContent: 'center' }}>
            <Button iconName="arrow-back" onPress={this.props.onClose} />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              autoFocus
              style={styles.textInput}
              placeholder="City / POI"
              onChangeText={debounce(this.onSearchTextChange, 800)}
            />
          </View>
        </View>
        {this.state.result && this.state.result.length > 0 ? (
          <View style={styles.resultContainer}>
            <FlatList
              data={this.state.result}
              renderItem={({ item }) => (
                <Search.ResultItem
                  key={item.id}
                  item={item}
                  onItemSelect={this.onSearchResultSelect}
                />
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        ) : (
          <View style={styles.resultContainer}>
            {this.state.recentSearchResults &&
              this.state.recentSearchResults.length > 0 && (
              <React.Fragment>
                <View style={styles.recentSearchHeaderContainer}>
                  <Text>Recent Searches:</Text>
                  <Text onPress={this.clearRecentSearchResults}>
                    <MaterialIcons name="clear" size={14} />
                  </Text>
                </View>
                <FlatList
                  data={this.state.recentSearchResults}
                  renderItem={({ item }) => (
                    <Search.ResultItem
                      key={item.id}
                      item={item}
                      onItemSelect={this.onSearchResultSelect}
                    />
                  )}
                  keyboardShouldPersistTaps="handled"
                />
              </React.Fragment>
            )}
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
      <View style={styles.resultItemInner}>
        <View style={styles.resultItemIcon}>
          <Text>
            <MaterialIcons name="place" size={20} />
          </Text>
        </View>
        <View>
          <Text style={styles.resultItemName}>
            {item.structured_formatting.main_text}
          </Text>
          <Text style={styles.resultItemVicinity}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

ResultItem.propTypes = {
  item: PropTypes.shape({
    structured_formatting: PropTypes.shape({
      main_text: PropTypes.string
    }),
    description: PropTypes.string
  }).isRequired,
  onItemSelect: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    opacity: 0.9
  },
  inputContainer: {
    flexDirection: 'row'
  },
  textInput: {
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 10,
    marginRight: 20
  },
  resultContainer: {
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginRight: 10,
    padding: 10
  },
  resultItem: {
    marginTop: 5,
    paddingTop: 5,
    marginBottom: 8,
    paddingBottom: 8
  },
  resultItemInner: {
    flexDirection: 'row'
  },
  resultItemIcon: {
    marginRight: 10,
    justifyContent: 'center'
  },
  resultItemName: {
    fontSize: 14
  },
  resultItemVicinity: {
    fontSize: 10
  },
  recentSearchHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Search;
