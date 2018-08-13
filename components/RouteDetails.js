import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { sToTime, mToKm } from '../lib/helper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

RouteDetails.propTypes = {
  distance: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired
};

function RouteDetails({ distance, duration, onRemove }) {
  return (
    <TouchableOpacity onPress={onRemove}>
      <View style={styles.container}>
        <View style={styles.containerInner}>
          <View>
            <View style={styles.toolbar}>
              <View style={styles.textContainer}>
                <MaterialIcons name="directions" size={20} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Distance</Text>
                <Text style={styles.textValue}>{mToKm(distance)}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Duration</Text>
                <Text style={styles.textValue}>{sToTime(duration)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.toolbar}>
            <MaterialIcons name="close" size={20} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    opacity: 0.9,
    borderColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  containerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toolbar: {
    flexDirection: 'row'
  },
  textContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 10
  },
  textValue: {
    fontSize: 14
  }
});

export default RouteDetails;
