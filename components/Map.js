import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import MapView, {
  MAP_TYPES,
  UrlTile,
  Marker,
  Polyline
} from 'react-native-maps';
import { thunderforest_api_key } from '../env';
import { RangeObservable } from 'rxjs/observable/RangeObservable';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const TILE_URLS = {
  ocm: `https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${thunderforest_api_key}`
};

class Map extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isInitialized: false
    };
    this.map = null;
  }

  componentDidUpdate() {
    if (
      // this.state.isInitialized &&
      this.props.position &&
      this.props.followPosition &&
      this.map
    ) {
      const latitude = this.props.position.coords.latitude;
      const longitude = this.props.position.coords.longitude;
      const coord = {
        latitude,
        longitude
      };
      this.map.animateToCoordinate(coord);
    }
  }

  onMapLongPress = e => {
    console.log('long press', e);
  };

  onMarkerPressed = e => {
    this.props.onMarkerPressed(e);
  };

  render() {
    if (!this.props.position) {
      return null;
    }

    const { marker, route } = this.props;
    const latitude = this.props.position.coords.latitude;
    const longitude = this.props.position.coords.longitude;
    const latitudeDelta = 0.02;
    const longitudeDelta = latitudeDelta * ASPECT_RATIO;
    const region = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    };

    return (
      <MapView
        ref={el => (this.map = el)}
        style={styles.map}
        mapType={MAP_TYPES.NONE}
        initialRegion={region}
        showsUserLocation={true}
        onLongPress={this.onMapLongPress}
      >
        <UrlTile urlTemplate={TILE_URLS.ocm} zIndex={-1} />
        {marker.map(_marker => (
          <Marker
            key={_marker.id}
            coordinate={_marker.coordinate}
            onPress={() => {
              this.onMarkerPressed(_marker);
            }}
          />
        ))}
        {route && (
          <Polyline
            coordinates={route}
            strokeWidth={5}
            strokeColor={'rgba(255,99,71,0.7)'}
          />
        )}
      </MapView>
    );
  }
}
Map.propTypes = {
  position: PropTypes.object,
  followPosition: PropTypes.bool.isRequired,
  marker: PropTypes.array.isRequired,
  onMarkerPressed: PropTypes.func.isRequired,
  route: PropTypes.array
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default Map;
