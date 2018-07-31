import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { MAP_TYPES, UrlTile, Marker } from 'react-native-maps';
import { thunderforest_api_key } from '../env';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
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

  handleMapLongPress = e => {
    console.log('long press', e);
  };

  componentDidUpdate() {
    if (
      // this.state.isInitialized &&
      this.props.position &&
      this.props.followPosition &&
      this.map
    ) {
      this.map.animateToCoordinate({
        latitude: this.props.position.coords.latitude,
        longitude: this.props.position.coords.longitude
      });
    }
  }

  render() {
    if (!this.props.position) {
      return null;
    }

    const region = {
      latitude: this.props.position.coords.latitude,
      longitude: this.props.position.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    const { marker } = this.props;
    return (
      <MapView
        ref={el => (this.map = el)}
        style={styles.map}
        mapType={MAP_TYPES.NONE}
        initialRegion={region}
        showsUserLocation
        onLongPress={this.handleMapLongPress}
      >
        <UrlTile urlTemplate={TILE_URLS.ocm} zIndex={-1} />
        {marker.map(_marker => (
          <Marker
            key={_marker.id}
            coordinate={_marker.coordinate}
            title={_marker.title}
          />
        ))}
      </MapView>
    );
  }
}

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
