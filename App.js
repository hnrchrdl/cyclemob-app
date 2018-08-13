import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Constants } from 'expo';

import Map from './components/Map';
import Search from './components/Search';
import Bikecomputer from './components/Bikecomputer';
import Toolbar from './components/Toolbar';
import MarkerDetails from './components/MarkerDetails';
import RouteDetails from './components/RouteDetails';
import { createMarker } from './lib/helper';
import { watchPosition } from './lib/geolocation';
import { getRoute } from './lib/gmaps-api';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      followUserLocation: true, // bool
      showSearch: false, // bool
      marker: [], // coordinate: { latitude, longitude }, description, id, pinColor, title
      markerDetails: null, // coordinate: { latitude, longitude }, description, id, pinColor, title
      position: null, // coords: { latitude, longitude, speed, accuracy, altitude, heading }, mocked, timestamp
      target: null, // coordinate: { latitude, longitude }, description, id, pinColor, title
      waypoints: null, // [coordinate: { latitude, longitude }, description, id, pinColor, title]
      targetRoute: null, // [{latitude, longitude}],
      targetDistance: null,
      targetDuration: null,
      showTargetRouteDetails: false
    };
  }

  componentDidMount() {
    watchPosition(position => {
      this.setState({
        position
      });
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

  selectLocation = item => {
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

  removeMarker = ({ id }) => {
    this.setState(
      state => ({
        marker: state.marker.filter(marker => marker.id !== id),
        markerDetails: null,
        target: !state.target || state.target.id === id ? null : state.target
      }),
      () => {
        if (!this.state.target) {
          this.updateRoute();
        }
      }
    );
  };

  showMarkerDetails = markerDetails => {
    this.setState({
      markerDetails
    });
  };

  dismissMarkerDetails = () => {
    this.setState({
      markerDetails: null
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
    // this.setState(
    //   state => ({
    //     waypoints: [...state.waypoints, waypoint]
    //   }),
    //   () => {
    //     this.updateRoute();
    //   }
    // );
  };

  removeWaypoint = waypoint => {
    // this.setState(
    //   state => ({
    //     waypoins: state.waypoints.filter(point => point.id !== waypoint.id)
    //   }),
    //   () => {
    //     this.updateRoute();
    //   }
    // );
  };

  updateRoute = () => {
    if (!this.state.target) {
      this.setState({
        targetRoute: null
      });
    } else {
      const origin = this.state.position.coords;
      const destination = this.state.target.coordinate;
      getRoute(origin, destination).then(({ route, distance, duration }) => {
        this.setState({
          targetRoute: route,
          targetDistance: distance,
          targetDuration: duration,
          showTargetRouteDetails: true
        });
      });
    }
  };

  hideTargetRouteDetails = () => {
    this.setState({
      showTargetRouteDetails: false
    });
  };

  removeTargetRoute = () => {
    this.setState({
      targetRoute: null,
      showTargetRouteDetails: false
    });
  };

  toggleShowMenu = () => {
    console.log('show Menu');
  };

  render() {
    const {
      position,
      followUserLocation,
      showSearch,
      marker,
      markerDetails,
      targetRoute,
      target,
      showTargetRouteDetails
    } = this.state;
    return position ? (
      <View style={styles.containerMap}>
        <Map
          followPosition={followUserLocation}
          marker={marker}
          activeMarkerId={markerDetails ? markerDetails.id : null}
          onMarkerPressed={this.showMarkerDetails}
          position={position}
          route={targetRoute}
        />
        <View style={styles.containerOnMapBottom}>
          {!showSearch && (
            <Bikecomputer
              speed={position.coords.speed}
              altitude={position.coords.altitude}
            />
          )}
          <Toolbar
            followUserLocation={followUserLocation}
            onToggleShowSearch={this.toggleShowSearch}
            onToggleUserLocation={this.toggleFollowUserLocation}
            onToggleShowMenu={this.toggleShowMenu}
          />
        </View>
        <View style={styles.containerOnMapTop}>
          {markerDetails &&
            !showSearch && (
            <MarkerDetails
              marker={markerDetails}
              onClose={this.dismissMarkerDetails}
              onSetAsTarget={this.setTarget}
              onSetAsWaypoint={this.setWaypoint}
              onRemove={this.removeMarker}
            />
          )}
          {showTargetRouteDetails &&
            markerDetails &&
            target &&
            markerDetails.id === target.id &&
            !showSearch && (
            <RouteDetails
              distance={this.state.targetDistance}
              duration={this.state.targetDuration}
              onClose={this.hideTargetRouteDetails}
              onRemove={this.removeTargetRoute}
            />
          )}
          {showSearch && (
            <Search
              onItemSelect={this.selectLocation}
              onClose={this.hideSearch}
              position={position}
            />
          )}
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  containerMap: {
    ...StyleSheet.absoluteFillObject
  },
  containerOnMapBottom: {
    ...StyleSheet.absoluteFillObject,
    top: 'auto'
  },
  containerOnMapTop: {
    ...StyleSheet.absoluteFillObject,
    top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  }
});
