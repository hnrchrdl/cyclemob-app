import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

Toolbar.propTypes = {
  onToggleShowSearch: PropTypes.func.isRequired,
  onToggleUserLocation: PropTypes.func.isRequired,
  onToggleShowMenu: PropTypes.func.isRequired,
  followUserLocation: PropTypes.bool.isRequired
};

function Toolbar({
  onToggleShowSearch,
  onToggleUserLocation,
  followUserLocation,
  onToggleShowMenu
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toolbarItem} onPress={onToggleShowSearch}>
        <MaterialIcons name="search" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.toolbarItem}
        onPress={onToggleUserLocation}
      >
        <MaterialIcons
          style={followUserLocation ? { color: 'tomato' } : {}}
          name="center-focus-strong"
          size={20}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarItem} onPress={onToggleShowMenu}>
        <MaterialIcons name="menu" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
    opacity: 0.9
  },
  toolbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});
export default Toolbar;
