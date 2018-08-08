import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string
};

function Button({ iconName, color, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialIcons style={color ? { color } : {}} name={iconName} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    margin: 5
  }
});

export default Button;
