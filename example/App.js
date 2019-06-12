import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';

import CollapsibleView from './CollapsibleView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const screenWidth = Dimensions.get('window').width;
const numberOfViews = 25;
const rowHeight = 50;

class Row extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.__onPress = this.__onPress.bind(this);
    this.state = {
      collapsed: nextProps.collapsed,
    };
  }
  __onPress(e) {
    this.setState(
      {
        collapsed: !this.state.collapsed,
      },
    );
  }
  render() {
    const {
      childHeight,
      duration,
    } = this.props;
    const {
      collapsed,
      childCollapsed,
    } = this.state;
    return (
      <TouchableOpacity
        style={{
          width: screenWidth,
          borderWidth: 5,
          padding: 20,
        }}
        onPress={this.__onPress}
      >
        <CollapsibleView
          duration={duration}
          collapsed={collapsed}
        >
          <View
            style={{
              width: screenWidth,
              height: screenWidth,
              backgroundColor: 'green',
            }}
          />
        </CollapsibleView>
      </TouchableOpacity>
    );
  }
};

export default class App extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.state = {
      views: [...Array(numberOfViews)]
        .map((e, i) => (
          <Row
            duration={Math.random() * 2000}
            collapsed={Math.random() > 0.5}
            childHeight={Math.random() * 400}
          />
        )),
    };
  }
  render() {
    const { views } = this.state;
    return (
      <ScrollView
        style={styles.container}
      >
        {views}
      </ScrollView>
    );
  }
}
