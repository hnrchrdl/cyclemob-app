import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Button = ({ onPress, iconName }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <MaterialIcons name={iconName} size={20} />
  </TouchableOpacity>
);

class Buttons extends React.PureComponent {
  render() {
    return (
      <View>
        {this.props.buttons.map(button => {
          <View key={button.key}>
            <Button iconName={button.iconName} onPress={button.onPress} />
          </View>;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {}
});

const getContainerStyle = side => {
  if (side === 'left') {
  }
};

export default Buttons;
