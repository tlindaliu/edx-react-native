'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
} = React;

var AnswerCard = React.createClass({
  render: function() {
    return (
      <View style={styles.card}/>
    );
  }
});

var styles = StyleSheet.create({
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 150,
    padding: 10,
    backgroundColor: 'grey'
  }
});

module.exports = AnswerCard;

