import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

ToolbarVertical.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node)
};
function ToolbarVertical({ items }) {
  return (
    <View style={styles.container}>
      {items.map(item => {
        return (
          <View key={item.key} style={styles.item}>
            {item}
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {}
});
export default ToolbarVertical;
