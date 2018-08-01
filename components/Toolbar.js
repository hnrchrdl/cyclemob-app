import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class Toolbar extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.toolbarItem}
          onPress={this.props.onToggleShowSearch}
        >
          <MaterialIcons name="search" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarItem}
          onPress={this.props.onToggleUserLocation}
        >
          <MaterialIcons
            style={this.props.followUserLocation ? { color: 'tomato' } : {}}
            name="center-focus-strong"
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarItem}>
          <MaterialIcons
            name="info-outline"
            size={20}
            onPress={this.props.onToggleShowBikecomputer}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolbarItem}
          onPress={this.props.onToggleShowMenu}
        >
          <MaterialIcons name="menu" size={20} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgba(255,255,255,.95)'
  },
  toolbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});
export default Toolbar;
