import React from 'react';
import { ToolbarAndroid, StyleSheet, View } from 'react-native';

class Navbar extends React.Component {
  onActionSelected = position => {
    if (position === 0) {
      this.props.handleSearchAction();
    }
  };

  render() {
    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Cyclemob"
          actions={[
            {
              title: 'Search',
              show: 'always'
            }
          ]}
          onActionSelected={this.onActionSelected}
          // titleColor={'#eee'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerToolbar: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  toolbar: {
    // backgroundColor: 'cyan',
    height: 56
  }
});
export default Navbar;
