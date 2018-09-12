import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

Bikecomputer.propTypes = {
  speed: PropTypes.number, // m/s
  altitude: PropTypes.number // m
};

function Bikecomputer({ speed, altitude }) {
  return (
    <View style={styles.container}>
      <View style={styles.displayItem}>
        <Text style={styles.displayItemDescription}>Speed</Text>
        <Text style={styles.displayItemValue}>
          {speed ? `${(((speed || 0) * 60 * 60) / 1000).toFixed(1)} km/h` : ''}
        </Text>
      </View>

      <View style={styles.displayItem}>
        <Text style={styles.displayItemDescription}>Altitude</Text>
        <Text style={styles.displayItemValue}>
          {altitude ? `${altitude.toFixed(1)} m` : '-'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    opacity: 0.9,
    backgroundColor: '#fff'
  },
  displayItem: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayItemDescription: {
    fontSize: 10
  },
  displayItemValue: {
    fontSize: 14
  }
});

export default Bikecomputer;
