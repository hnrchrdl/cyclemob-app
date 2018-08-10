import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';
import { sToTime, mToKm } from '../lib/helper';

RouteDetails.propTypes = {
  distance: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

function RouteDetails({ distance, duration, onRemove, onClose }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Text>{mToKm(distance)}</Text>
        <Text>{sToTime(duration)}</Text>
        <Button iconName="close" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  containerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default RouteDetails;
