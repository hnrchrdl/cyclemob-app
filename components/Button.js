import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string,
  outline: PropTypes.bool
};

function Button({ iconName, color, onPress, outline }) {
  return (
    <TouchableOpacity
      style={[styles.container, outline ? styles.outlined : {}]}
      onPress={onPress}
    >
      <MaterialIcons style={color ? { color } : {}} name={iconName} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: 'transparent'
  },
  outlined: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    borderRadius: 100,
    backgroundColor: '#fff'
  },
  noOutline: {}
});

export default Button;
