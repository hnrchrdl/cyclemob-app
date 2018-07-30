import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  TextInput,
  ToolbarAndroid,
  Platform
} from 'react-native';
import Map from './Map';
import { Constants } from 'expo';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const TOOLBAR_HEIGHT = 56;
export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      followUser: true
    };
  }

  toggleFollowUser = () => {
    this.setState(state => ({
      followUser: !state.followUser
    }));
  };

  render() {
    const { followUser } = this.state;
    return (
      <View style={styles.containerApp}>
        <View style={styles.containerToolbar}>
          <ToolbarAndroid
            style={styles.toolbar}
            title="Cyclemob"
            actions={[
              {
                title: 'Search',
                iconName: 'md-cog',
                show: 'always'
              }
            ]}
            // titleColor={'#eee'}
          />
        </View>
        <View style={styles.containerMap}>
          <Map followUser={followUser} />
          <View style={styles.btnFollowUserToggleContainer}>
            <Button
              style={styles.btnFollowUserToggle}
              color={followUser ? 'tomato' : 'cadetblue'}
              title={
                followUser
                  ? "stop following user's position"
                  : "follow user's position on map"
              }
              onPress={this.toggleFollowUser}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerApp: {
    flex: 1
  },
  containerToolbar: {
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    height: TOOLBAR_HEIGHT,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  toolbar: {
    backgroundColor: '#fff',
    height: TOOLBAR_HEIGHT
  },
  containerMap: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? TOOLBAR_HEIGHT
        : Constants.statusBarHeight + TOOLBAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnFollowUserToggleContainer: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: width
  },
  btnFollowUserToggle: {}
});
