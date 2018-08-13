import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button';

MarkerDetails.propTypes = {
  marker: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    })
  }).isRequired,
  onSetAsTarget: PropTypes.func.isRequired,
  onSetAsWaypoint: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

function MarkerDetails({
  marker,
  onClose,
  onSetAsTarget,
  onSetAsWaypoint,
  onRemove
}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={{ flex: 0 }}>
          <Button iconName="arrow-back" onPress={onClose} />
        </View>
        <View style={{ flex: 1, padding: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 5 }}>
              <MaterialIcons name="place" size={14} />
            </Text>
            <Text style={styles.title}>{marker.title}</Text>
          </View>
          <View>
            <Text style={styles.description}>{marker.description}</Text>
          </View>
        </View>
        <View style={styles.toolbar}>
          <Button
            onPress={() => onSetAsTarget(marker)}
            iconName="directions"
            outline
          />
          <Button
            iconName="location-off"
            onPress={() => onRemove(marker)}
            outline
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    opacity: 0.9
  },
  containerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 14
  },
  description: {
    fontSize: 10
  },
  toolbar: {
    flexDirection: 'row'
  }
});

export default MarkerDetails;
