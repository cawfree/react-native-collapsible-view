import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import Collapsible from './CollapsibleView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: Dimensions.get('window').width,
    height: 55,
    backgroundColor: 'red',
  },
  extend: {
    width: Dimensions.get('window').width,
    backgroundColor: 'yellow',
  },
});

export default class App extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.__onPress = this.__onPress.bind(this);
    this.__onExpand = this.__onExpand.bind(this);
    this.state = {
      collapsed: true,
      animHeight: new Animated.Value(55),
    };
  }
  __onPress(e) {
    this.setState(
      {
        collapsed: !this.state.collapsed,
      },
    );
  }
  __onExpand(e) {
    const { animHeight } = this.state;
    return Animated.timing(
      animHeight,
      {
        toValue: 500,
        duration: 600,
      },
    )
      .start();
  }
  render() {
    const {
      collapsed,
      animHeight,
      ...extraState
    } = this.state;
    return (
      <View
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={this.__onPress}
        >
        </TouchableOpacity>
        <Collapsible
          collapsed={collapsed}
        >
          <TouchableOpacity
            style={styles.extend}
            onPress={this.__onExpand}
          >
            <Animated.View
              style={{
                width: Dimensions.get('window').width,
                height: animHeight,
              }}
            />
          </TouchableOpacity>
        </Collapsible>
      </View>
    );
  }
}
