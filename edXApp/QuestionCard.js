'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text
} = React;

var QuestionCard = React.createClass({
  componentDidMount: function() {
    setTimeout(this.record)
  },
  record: function() {
    this.ans = null;
    this.refs['q'].measure((ox, oy, width, height, px, py) => {
      this.originalX = px;
      this.originalY = py;
      this.width = width;
      this.height = height;
    });
  },
  getInitialState: function() {
    return {
      x: 0,
      y: 0
    }
  },
  setPosition: function(e) {
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
      y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
    });
    this.drag.x = e.nativeEvent.pageX;
    this.drag.y = e.nativeEvent.pageY;
  },

  resetPosition: function(e) {
    for (var ans in this.props.coords) {
      var mments = this.props.coords[ans];
      var lowerX = mments["x"];
      var lowerY = mments["y"];
      var higherX = lowerX + mments["width"];
      var higherY = lowerY + mments["height"];
      var adjX = this.state.x + this.originalX;
      var adjY = this.state.y + this.originalY;
      if(adjX > lowerX && adjX + this.width < higherX && adjY > lowerY && adjY + this.height < higherY) {
        this.ans = ans;
        return;
      }
    }

    this.dragging = false;
    this.setState({
      x: 0,
      y: 0
    })
  },
  _onStartShouldSetResponder: function(e) {
    this.dragging = true;
    this.drag = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    }
    return true;
  },
  _onMoveShouldSetResponder: function(e) {
    return true;
  },
  getCardStyle: function() {
    var transform = [{translateX: this.state.x}, {translateY: this.state.y}];
    return {transform: transform};
  },
  render: function() {
    return (
      <View
        ref = 'q'
        onResponderMove={this.setPosition}
        onResponderRelease={this.resetPosition}
        onStartShouldSetResponder={this._onStartShouldSetResponder}
        onMoveShouldSetResponder={this._onMoveShouldSetResponder}
        style={[styles.card, this.getCardStyle()]}>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  },
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 100,
    height: 100,
    margin: 5,
    padding: 10,
    backgroundColor: 'white'
  },
});

module.exports = QuestionCard;

