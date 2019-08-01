import React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create(
  {
    container: {
      position: 'absolute',
      flex: 1,
      flexDirection: 'row',
    },
  },
);

class Collapsible extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.state = {
      animValue: new Animated.Value(0),
      width: undefined,
      height: 0,
    };
    this.__onLayout = this.__onLayout.bind(this);
    this.__onRootLayout = this.__onRootLayout.bind(this);
  }
  componentWillUpdate(nextProps, nextState) {
    const {
      collapsed,
      duration,
    } = nextProps;
    const {
      animValue,
      height,
    } = nextState;
    if (!collapsed && this.props.collapsed) {
      Animated.timing(
        animValue,
        {
          toValue: height,
          duration,
        },
      )
        .start();
    } else if (collapsed && !this.props.collapsed) {
      Animated.timing(
        animValue,
        {
          toValue: 0,
          duration,
        },
      )
        .start();
    }
  }
  __requestMeasure() {
    const { child } = this.refs;
    return new Promise(resolve => child.measure(resolve))
      .then((ox, oy, width, height, px, py) => height);
  }
  __onRootLayout(e) {
    const {
      width,
    } = e.nativeEvent.layout;
    if (width !== this.state.width) {
      this.setState(
        {
          width,
        },
      );
    }
  }
  __onLayout(e) {
    const {
      height,
      duration,
    } = e.nativeEvent.layout;
    const shouldInit = !this.state.height;
    this.setState(
      {
        height,
      },
      () => {
        const { collapsed } = this.props;
        const { animValue } = this.state;
        if (shouldInit) {
          Animated
            .timing(
              animValue,
              {
                toValue: collapsed ? 0 : height,
                // TODO: use a fast duration to catch up with content size changes
                duration: 100,
              },
            )
            .start();
        }
        if (!collapsed) {
          animValue
            .setValue(height);
        }
      },
    );
  }
  render() {
    const { 
      collapsed,
      children,
    } = this.props;
    const {
      animValue: height,
      width,
    } = this.state;
    return (
      <Animated.View
        style={{
          overflow: 'hidden',
          height,
        }}
        onLayout={this.__onRootLayout}
        removeClippedSubviews={false}
        collapsable={false}
        renderToHardwareTextureAndroid
      >
        <View
          ref="child"
          onLayout={this.__onLayout}
          style={[
            styles.container,
            {
              // XXX: Hack to force the web to scale.
              width: Platform.OS === 'web' ? width : undefined,
            },
          ]}
        >
          {children}
        </View>
      </Animated.View>
    );
  }
}

Collapsible.propTypes = {
  duration: PropTypes.number,
};

Collapsible.defaultProps = {
  duration: 200,
};


export default Collapsible;
