import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MapView, {
  MAP_TYPES,
  UrlTile,
  Marker,
  Polyline
} from 'react-native-maps';
import { thunderforest_api_key } from '../env';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const TILE_URLS = {
  ocm: `https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${thunderforest_api_key}`
};

class Map extends React.PureComponent {
  map = null;

  componentDidUpdate() {
    if (this.props.position && this.props.followPosition && this.map) {
      this.map.animateToCoordinate(this.props.position.coords);
    }
  }

  onMapLongPress = () => {
    if (this.props.onMapLongPressed) {
      this.props.onMapLongPressed();
    }
  };

  onMarkerPressed = e => {
    if (this.props.onMarkerPressed) {
      this.props.onMarkerPressed(e);
    }
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
        {marker &&
          marker.map(_marker => (
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
  position: PropTypes.shape({
    coords: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    })
  }),
  followPosition: PropTypes.bool.isRequired,
  marker: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      coordinate: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
      })
    })
  ).isRequired,
  onMarkerPressed: PropTypes.func,
  route: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    })
  ),
  onMapLongPressed: PropTypes.func
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
