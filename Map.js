import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { MAP_TYPES, UrlTile } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const TILE_URLS = {
  ocm:
    'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=61444b383bbc468dbd554f7257efd5f3'
};

class Map extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      iniitalRegion: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        const { latitude, longitude } = pos.coords;
        if (!this.state.initialRegion) {
          this.setState({
            initialRegion: {
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
          });
        }
      },
      err => {
        console.err(err);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  handleMapLongPress = e => {
    console.log('long press', e);
  };

  render() {
    const { initialRegion } = this.state;
    if (!initialRegion) {
      return null;
    }
    return (
      <MapView
        style={styles.map}
        mapType={MAP_TYPES.NONE}
        initialRegion={initialRegion}
        showsUserLocation
        followsUserLocation={this.state.followUser}
        onLongPress={this.handleMapLongPress}
      >
        <UrlTile urlTemplate={TILE_URLS.ocm} zIndex={-1} />
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
