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

function getRegionFromPositionAndZoom(position, zoomFactor) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const latitudeDelta = 0.004 * zoomFactor;
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;
  const region = {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  };
  return region;
}

class Map extends React.PureComponent {
  map = null;

  componentDidUpdate(prevProps) {
    if (this.map) {
      if (
        (this.props.route &&
          JSON.stringify(prevProps.route) !==
            JSON.stringify(this.props.route)) ||
        (this.props.marker &&
          JSON.stringify(prevProps.marker) !==
            JSON.stringify(this.props.marker))
      ) {
        // Route or Marker changed.
        const coords = [
          ...(this.props.position
            ? [
              {
                latitude: this.props.position.coords.latitude,
                longitude: this.props.position.coords.longitude
              }
            ]
            : []),
          ...(this.props.route ? this.props.route : []),
          ...(this.props.marker ? this.props.marker.map(m => m.coordinate) : [])
        ];
        if (coords.length > 1) {
          this.map.fitToCoordinates(coords, {
            edgePadding: { top: 100, left: 50, right: 50, bottom: 200 },
            animated: true
          });
        }
      } else if (this.props.position && this.props.followPosition && this.map) {
        // Position or FollowPosition changed.
        this.map.animateToCoordinate(this.props.position.coords);
      }
      if (this.props.zoom && prevProps.zoom !== this.props.zoom) {
        // Zoom changed.
        const region = getRegionFromPositionAndZoom(
          this.props.position,
          this.props.zoom
        );
        this.map.animateToRegion(region);
      }
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

  isActive = marker => marker.id === this.props.activeMarkerId;

  render() {
    if (!this.props.position) {
      return null;
    }

    const { marker, route, position } = this.props;
    const region = getRegionFromPositionAndZoom(position, 5);

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
              pinColor={this.isActive(_marker) ? 'tomato' : 'gold'}
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
  activeMarkerId: PropTypes.string,
  onMarkerPressed: PropTypes.func,
  route: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    })
  ),
  onMapLongPressed: PropTypes.func,
  zoom: PropTypes.number // 0 for all zoomed in, higher numbers for wider map zoom
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
