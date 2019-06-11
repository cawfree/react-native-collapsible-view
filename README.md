# react-native-collapsible-view
A &lt;Collapsible/> component for react-native that plays nicely with Android.

## 🚀 Getting Started
Using [npm](https://www.npmjs.com/package/@cawfree/react-native-collapsible-view'):
```bash
npm install --save @cawfree/react-native-collapsible-view
```
Using [yarn](https://www.npmjs.com/package/@cawfree/react-native-collapsible-view'):
```
yarn add @cawfree/react-native-collapsible-view
```

## ✍️ Usage
```javascript
import React from 'react';
import { View, Text } from 'react-native';
import Collapsible from '@cawfree/react-native-collapsible-view';

export default ({ collapsed, ...nextProps }) => (
  <Collapsible
    collapsed={collapsed}
    duration={500}
  >
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
      >
        {'Boo!'}
      </Text>
    <View>
  </Collapsible>
);
```

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)
