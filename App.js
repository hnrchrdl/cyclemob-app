import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';

import Button from './components/Button';
import Map from './components/Map';
import Search from './components/Search';
import Bikecomputer from './components/Bikecomputer';
import Toolbar from './components/Toolbar';
import { Constants } from 'expo';
import { getDistance } from './lib/lib'

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 36000,
  distanceFilter: 1
}

const ERROR_HANDLER_FACTORY = errName => err => {
  console.error(errName , err)
}

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      followUserLocation: true,
      showSearch: false,
      showBikecomputer: false,
      marker: [],
      position: null,
      isRecording: false,
      etappeDistance: 0,
      etappeAvgSpeed: 0,
      etappeTopSpeed: 0,
      etappeTime: 0,
      etappeMoveTime: 0,
    };
  }

  componentDidMount() {
    navigator.geolocation.watchPosition(
      position => {
        this.setState(state => ({
          position,
          etappeDistance: state.isRecording && state.position
            ? state.etappeDistance + getDistance(state.position.coords, position.coords)
            : state.etappeDistance,
          marker: state.isRecording
            ? [
                ...state.marker,
                {
                  id: (state.marker.length + 1).toString(),
                  place_id: (state.marker.length + 1).toString(),
                  title: '',
                  description: '',
                  coordinate: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  }
                }
              ]
            : state.marker
        }));
      },
      ERROR_HANDLER_FACTORY('Geolocation error'),
      GEOLOCATION_OPTIONS
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

  startRecording = () => {
    this.setState({
      isRecording: true
    });
  };

  stopRecording = () => {
    this.setState({
      isRecording: false
    });
  };

  render() {
    const {
      position,
      followUserLocation,
      showSearch,
      showBikecomputer,
      marker,
      isRecording,
      etappeDistance,
      etappeAvgSpeed,
      etappeTopSpeed,
      etappeTime,
      etappeMoveTime
    } = this.state;
    return (
      <View style={styles.containerMap}>
        <Map
          followPosition={followUserLocation}
          marker={marker}
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
          <View style={styles.containerButtonsContainer}>
            {isRecording ? (
              <Button iconName="stop" onPress={this.stopRecording} />
            ) : (
              <Button
                iconName="fiber-manual-record"
                color="tomato"
                onPress={this.startRecording}
              />
            )}
          </View>
          {showBikecomputer && (
            <Bikecomputer
              speed={position.coords.speed}
              altitude={position.coords.altitude}
              distance={etappeDistance}
              avgSpeed={etappeAvgSpeed}
              topSpeed={etappeTopSpeed}
              time={etappeTime}
              moveTime={etappeMoveTime}
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
  containerButtonsContainer: {
    flex: 1,
    margin: 5,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});
