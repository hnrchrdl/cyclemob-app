import React from 'react';
import { StyleSheet, View, Dimensions, Platform, Text } from 'react-native';

import Map from './components/Map';
import Search from './components/Search';
import Bikecomputer from './components/Bikecomputer';
import Toolbar from './components/Toolbar';
import { Constants } from 'expo';

const { width } = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      followUserLocation: true,
      showSearch: false,
      showBikecomputer: false,
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

  toggleFollowUserLocation = () => {
    this.setState(state => ({
      followUserLocation: !state.followUserLocation
    }));
  };

  toggleShowSearch = () => {
    this.setState(state => ({
      showSearch: !state.showSearch
    }));
  };

  hideSearch = () => {
    this.setState(state => ({
      showSearch: false
    }));
  };

  toggleShowBikecomputer = () => {
    this.setState(state => ({
      showBikecomputer: !state.showBikecomputer
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
    const {
      position,
      followUserLocation,
      showSearch,
      showBikecomputer
    } = this.state;
    return (
      <View style={styles.containerMap}>
        <Map
          followPosition={followUserLocation}
          marker={this.state.marker}
          position={position}
        />
        <View style={styles.containerOnMapTop}>
          {position && (
            <Text style={{ color: 'tomato' }}>
              {position.coords.latitude} | {position.coords.longitude}
            </Text>
          )}
          {showSearch && (
            <Search
              onItemSelect={this.onLocationSelected}
              onClose={this.hideSearch}
            />
          )}
        </View>
        <View style={styles.containerOnMapBottom}>
          {showBikecomputer && (
            <Bikecomputer
              speed={position.coords.speed}
              altitude={position.coords.altitude}
            />
          )}
          <Toolbar
            onToggleShowSearch={this.toggleShowSearch}
            onToggleUserLocation={this.toggleFollowUserLocation}
            followUserLocation={followUserLocation}
            onToggleShowBikecomputer={this.toggleShowBikecomputer}
            onToggleShowMenu={this.onToggleShowMenu}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  containerOnMapBottom: {
    position: 'absolute',
    // top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    left: 0,
    right: 0,
    bottom: 0
  },
  containerOnMapTop: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    left: 0,
    right: 0
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
