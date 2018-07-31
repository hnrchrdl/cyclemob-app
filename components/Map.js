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

class Map extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      initialRegion: null
    };
  }

  shouldComponentUpdate(props) {
    const { initialRegion } = this.state;
    const { position } = props;
    if (!initialRegion && position) {
      const { latitude, longitude } = position.coords;
      this.setState({
        initialRegion: {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
      return true;
    }
    return false;
  }

  handleMapLongPress = e => {
    console.log('long press', e);
  };

  render() {
    const { initialRegion } = this.state;
    const { followUser, marker } = this.props;

    if (!initialRegion) {
      return null;
    }
    return (
      <MapView
        style={styles.map}
        mapType={MAP_TYPES.NONE}
        initialRegion={initialRegion}
        showsUserLocation
        followsUserLocation={followUser}
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
