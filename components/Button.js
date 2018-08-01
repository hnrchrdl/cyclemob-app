import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <MaterialIcons
          style={this.props.color ? { color: this.props.color } : {}}
          name={this.props.iconName}
          size={20}
        />
      </TouchableOpacity>
    );
  }
}
Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string
};

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
