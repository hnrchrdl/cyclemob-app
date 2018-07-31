import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Platform,
  Text
} from 'react-native';

import Map from './components/Map';
import Navbar from './components/Navbar';
import Search from './components/Search';
import { Constants } from 'expo';

const { width } = Dimensions.get('window');
const TOOLBAR_HEIGHT = 56;

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      followUser: true,
      showSearch: false,
      marker: [],
      position: null
    };
  }

  componentDidMount() {
    navigator.geolocation.watchPosition(
      position => {
        this.setState({
          position
        });
      },
      err => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 36000,
        distanceFilter: 1
      }
    );
  }

  toggleFollowUser = () => {
    this.setState(state => ({
      followUser: !state.followUser
    }));
  };

  handleSearchAction = () => {
    this.setState(state => ({
      showSearch: !state.showSearch
    }));
  };

  onLocationSelected = item => {
    this.setState(state => ({
      showSearch: false,
      marker: [
        ...state.marker,
        {
          id: item.id,
          place_id: item.place_id,
          title: item.name,
          description: item.vicinity,
          coordinate: {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng
          }
        }
      ]
    }));
  };

  render() {
    const { position, followUser, showSearch } = this.state;
    return (
      <View style={styles.containerApp}>
        <Navbar handleSearchAction={this.handleSearchAction} />
        <View style={styles.containerMap}>
          <Map
            followUser={followUser}
            marker={this.state.marker}
            position={position}
          />
          {showSearch && <Search onItemSelect={this.onLocationSelected} />}
          <View style={styles.containerMoveInfo}>
            {position && <Text>{position.coords.speed} km/h</Text>}
          </View>
          <View style={styles.btnFollowUserToggleContainer}>
            <Button
              style={styles.btnFollowUserToggle}
              color={followUser ? 'tomato' : 'cadetblue'}
              title={
                followUser
                  ? "stop following user's position"
                  : "follow user's position on map"
              }
              onPress={this.toggleFollowUser}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerApp: {
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    flex: 1
  },
  containerMap: {
    position: 'absolute',
    top: TOOLBAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnFollowUserToggleContainer: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: width
  },
  containerMoveInfo: {
    position: 'absolute',
    bottom: 50,
    flex: 1,
    width: width,
    padding: 10,
    backgroundColor: '#fff'
  },
  btnFollowUserToggle: {}
});
