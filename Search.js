import React from 'react';
import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {
  getPlacesAutocomplete,
  getPlaceDetails,
  createSessionToken
} from './lib';
import { debounce } from 'lodash';

class SearchResultItem extends React.Component {
  onPress = () => {
    const { item } = this.props;
    this.props.onItemSelect(item);
  };
  render() {
    const { item } = this.props;
    const { main_text } = item.structured_formatting;
    const { description } = item;
    return (
      <TouchableOpacity style={styles.resultItem} onPress={this.onPress}>
        <Text style={styles.resultItemName}>{main_text}</Text>
        <Text style={styles.resultItemVicinity}>{description}</Text>
      </TouchableOpacity>
    );
  }
}

class Search extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      result: [],
      sessionToken: createSessionToken()
    };
  }
  onSearchTextChange = input => {
    if (input.length === 0) {
      this.setState({
        sessionToken: createSessionToken()
      });
    } else {
      getPlacesAutocomplete(input, this.state.sessionToken).then(data => {
        this.setState({ result: data });
      });
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
        <TextInput
          autoFocus
          style={styles.textInput}
          placeholder="City / POI"
          onChangeText={debounce(this.onSearchTextChange, 800)}
        />
        <View style={styles.resultContainer}>
          <FlatList
            data={this.state.result}
            renderItem={({ item }) => (
              <SearchResultItem
                key={item.place_id}
                item={item}
                onItemSelect={this.onSearchResultSelect}
              />
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    flex: 1,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#fff'
  },
  resultContainer: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    marginTop: 15,
    paddingBottom: 15
  },
  textInput: {
    height: 40
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
