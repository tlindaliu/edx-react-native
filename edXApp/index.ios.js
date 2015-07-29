'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var InitialScreen = require('./DragDrop')

var edXApp = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        initialRoute={{
          title: 'Initial',
          component: InitialScreen  
        }}
        style={styles.container}/>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('edXApp', () => edXApp);

