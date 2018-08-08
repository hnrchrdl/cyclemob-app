import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';

import Map from './components/Map';
import Search from './components/Search';
import Bikecomputer from './components/Bikecomputer';
import Toolbar from './components/Toolbar';
import MarkerDetails from './components/MarkerDetails';
import { Constants } from 'expo';
import { getDistance, createMarker } from './lib/helper';
import { watchPosition } from './lib/geolocation';
import { getRoute } from './lib/gmaps-api';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      followUserLocation: true, // bool
      showSearch: false, // bool
      showBikecomputer: false, // bool
      marker: [], // coordinate: { latitude, longitude }, description, id, pinColor, title
      markerDetails: null, // coordinate: { latitude, longitude }, description, id, pinColor, title
      position: null, // coords: { latitude, longitude, speed, accuracy, altitude, heading }, mocked, timestamp
      target: null, // coordinate: { latitude, longitude }, description, id, pinColor, title
      waypoints: null, // [coordinate: { latitude, longitude }, description, id, pinColor, title]
      targetRoute: null // [{latitude, longitude}]
    };
  }

  componentDidMount() {
    watchPosition(position => {
      this.setState(state => ({
        position,
        etappeDistance:
          state.isRecording && state.position
            ? state.etappeDistance +
              getDistance(state.position.coords, position.coords)
            : state.etappeDistance,
        marker:
          state.isRecording && state.position
            ? [
              ...state.marker,
              createMarker({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              })
            ]
            : state.marker
      }));
    });
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
    this.setState({
      showSearch: false
    });
  };

  toggleShowBikecomputer = () => {
    this.setState(state => ({
      showBikecomputer: !state.showBikecomputer
    }));
  };

  onLocationSelected = item => {
    const marker = createMarker({
      id: item.id,
      title: item.name,
      description: item.vicinity,
      lat: item.geometry.location.lat,
      lng: item.geometry.location.lng
    });
    this.setState(state => ({
      showSearch: false,
      marker: [...state.marker, marker],
      markerDetails: marker
    }));
  };

  onToggleShowMenu = () => {
    console.log('show Menu');
  };

  onMarkerPressed = markerDetails => {
    this.setState({
      markerDetails
    });
  };

  setTarget = target => {
    this.setState(
      {
        target
      },
      () => {
        this.updateRoute();
      }
    );
  };

  unsetTarget = () => {
    this.setState(
      {
        target: null
      },
      () => {
        this.updateRoute();
      }
    );
  };

  setWaypoint = waypoint => {
    this.setState(
      state => ({
        waypoints: [...state.waypoints, waypoint]
      }),
      () => {
        this.updateRoute();
      }
    );
  };

  removeWaypoint = waypoint => {
    this.setState(
      state => ({
        waypoins: state.waypoints.filter(point => point.id !== waypoint.id)
      }),
      () => {
        this.updateRoute();
      }
    );
  };

  updateRoute = () => {
    if (!this.state.target) {
      this.setState({
        targetRoute: null
      });
    }
    const origin = {
      latitude: this.state.target.coordinate.latitude,
      longitude: this.state.target.coordinate.longitude
    };
    const destination = {
      latitude: this.state.position.coords.latitude,
      longitude: this.state.position.coords.longitude
    };
    getRoute(origin, destination).then(targetRoute => {
      this.setState({
        targetRoute
      });
    });
  };

  dismissMarkerDetails = () => {
    this.setState({
      markerDetails: null
    });
  };

  removeMarker = marker => {
    this.setState(state => ({
      marker: state.marker.filter(_marker => _marker.id !== marker.id),
      markerDetails: null
    }));
  };

  render() {
    const {
      position,
      followUserLocation,
      showSearch,
      showBikecomputer,
      marker,
      markerDetails,
      targetRoute
    } = this.state;
    return position ? (
      <View style={styles.containerMap}>
        <Map
          followPosition={followUserLocation}
          marker={marker}
          onMarkerPressed={this.onMarkerPressed}
          position={position}
          route={targetRoute}
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
              position={position}
            />
          )}
        </View>
        <View style={styles.containerOnMapBottom}>
          {markerDetails && (
            <MarkerDetails
              marker={markerDetails}
              onClose={this.dismissMarkerDetails}
              onSetAsTarget={this.setTarget}
              onSetAsWaypoint={this.setWaypoint}
              onRemove={this.removeMarker}
            />
          )}
          {showBikecomputer && (
            <Bikecomputer
              speed={position.coords.speed}
              altitude={position.coords.altitude}
            />
          )}
          <Toolbar
            followUserLocation={followUserLocation}
            onToggleShowSearch={this.toggleShowSearch}
            onToggleUserLocation={this.toggleFollowUserLocation}
            onToggleShowBikecomputer={this.toggleShowBikecomputer}
            onToggleShowMenu={this.onToggleShowMenu}
          />
        </View>
      </View>
    ) : null;
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
