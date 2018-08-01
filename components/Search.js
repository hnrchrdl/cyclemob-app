import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  getPlacesAutocomplete,
  getPlaceDetails,
  createSessionToken
} from '../lib/lib';
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
        <View style={styles.inputContainer}>
          <View style={{ flex: 0, marginTop: 10, marginRight: -15 }}>
            <MaterialIcons name="search" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              autoFocus
              style={styles.textInput}
              placeholder="City / POI"
              onChangeText={debounce(this.onSearchTextChange, 800)}
            />
          </View>
          <TouchableOpacity
            style={{ flex: 0, padding: 10 }}
            onPress={this.props.onClose}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        {this.state.result.length > 0 && (
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
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    opacity: 0.95
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10
  },
  textInput: {
    height: 40,
    marginLeft: -10,
    paddingLeft: 30,
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
