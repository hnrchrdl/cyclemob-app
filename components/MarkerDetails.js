import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import Button from './Button';
import { MaterialIcons } from '@expo/vector-icons';

class MarkerDetails extends React.PureComponent {
  render() {
    const {
      marker,
      onClose,
      onSetAsTarget,
      onSetAsWaypoint,
      onRemove
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerInner}>
          <View>
            <Text style={styles.title}>
              <MaterialIcons name="place" />
              {marker.title}
            </Text>
            <Text style={styles.description}>{marker.description}</Text>
            <View style={styles.toolbar}>
              <Button
                onPress={() => onSetAsTarget(marker)}
                iconName="directions"
              />
              <Button onPress={() => onSetAsWaypoint(marker)} iconName="add" />
            </View>
          </View>
          <View>
            <View style={styles.toolbar}>
              <Button
                iconName="location-off"
                onPress={() => onRemove(marker)}
              />
              <Button iconName="close" onPress={onClose} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

MarkerDetails.propTypes = {
  marker: PropTypes.object.isRequired,
  onSetAsTarget: PropTypes.func.isRequired,
  onSetAsWaypoint: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  containerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    padding: 5,
    fontSize: 14
  },
  description: {
    padding: 5,
    fontSize: 10
  },
  toolbar: {
    flexDirection: 'row'
  }
});
export default MarkerDetails;
