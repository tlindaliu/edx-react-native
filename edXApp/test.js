'use strict';
var Button = require('react-native-button');
var React = require('react-native');

var ExampleComponent = React.createClass({
  render() {
    return (
      <Button style={{color: 'green'}} onPress={this._handlePress}>
        Press Me!
      </Button>
    );
  },

  _handlePress(event) {
    console.log('Pressed!');
  },
});

module.exports = ExampleComponent;