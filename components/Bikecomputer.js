import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

Bikecomputer.propTypes = {
  speed: PropTypes.number,
  altitude: PropTypes.number
};
function Bikecomputer({ speed, altitude }) {
  return (
    <View style={styles.container}>
      <View style={styles.displayItem}>
        <Text style={styles.displayItemDescription}>Speed</Text>
        <Text style={styles.displayItemValue}>{`${((speed || 0) * 60 * 60) /
          1000} km/h`}</Text>
      </View>

      <View style={styles.displayItem}>
        <Text style={styles.displayItemDescription}>Altitude</Text>
        <Text style={styles.displayItemValue}>{`${altitude || 0} m`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  containerInnerSmall: {
    flex: 1
  },
  containerInnerBig: { flex: 3, flexDirection: 'row' },
  containerTwoRows: { flex: 1 },
  displayItem: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayItemDescription: {
    fontSize: 10
  },
  displayItemValue: {}
});
export default Bikecomputer;
