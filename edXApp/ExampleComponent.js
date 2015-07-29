'use strict';
var Button = require('react-native-button');
var React = require('react-native');
var {
  PropTypes,
  AppRegistry,
  StyleSheet,
  View,
} = React;

var ExampleComponent = React.createClass({
  propTypes: {
    onPress: true
  },
  render() {
    return (
      <Button style={styles.container} onPress={this._handlePress}>
        Press Me!
      </Button>
    );
  },

  _handlePress(event) {
    console.log('Pressed!');
  },
});

var styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  }
});

module.exports = ExampleComponent;