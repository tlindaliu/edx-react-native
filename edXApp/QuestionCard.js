'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  AlertIOS
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
  reset: function() {
    this.setState({
      x: 0,
      y: 0,
      dragging: false
    });
    this.ans = null;
  },
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      dragging: false
    }
  },
  setPosition: function(e) {
    if (!this.state.dragging) return
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
      y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
    });
    this.drag.x = e.nativeEvent.pageX;
    this.drag.y = e.nativeEvent.pageY;
  },
  resetPosition: function(e) {
    this.setState({
      dragging: false
    });

    for (var ans in this.props.parent.coords) {
      var mments = this.props.parent.coords[ans];
      var lowerX = mments["x"];
      var lowerY = mments["y"];
      var higherX = lowerX + mments["width"];
      var higherY = lowerY + mments["height"];
      var adjX = this.state.x + this.originalX;
      var adjY = this.state.y + this.originalY;
      if(adjX > lowerX && adjX + this.width < higherX && adjY > lowerY && adjY + this.height < higherY) {
        this.ans = ans;

        var data = { val: this.props.info.id, zone: ans, top: adjY, left: adjX };
        fetch(this.props.parent.props.runtime.handlerUrl(this, "do_attempt"), {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //'X-CSRFToken': this.props.parent.csrf
          },
          body: JSON.stringify(data)
        }).then((response) => response.json())
          .then((responseData) => {
            AlertIOS.alert(
              responseData['correct'] ? "Correct!" : "Try again :(",             
              responseData['feedback'],
              [
                {text: 'Close', onPress: () => this.props.parent.publishEvent({event_type: 'xblock.drag-and-drop-v2.feedback.closed', content: responseData['feedback'], manually: true })},
              ]
            )

            this.props.parent.publishEvent({
                event_type: 'xblock.drag-and-drop-v2.feedback.opened',
                content: responseData['feedback']
            });

          }).done();

        return;
      }
    }

    this.setState({
      x: 0,
      y: 0
    })
    this.ans = null;
  },
  _onStartShouldSetResponder: function(e) {
    this.setState({
      dragging: true
    });
    this.drag = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    }

    this.props.parent.publishEvent({
        event_type: 'xblock.drag-and-drop-v2.item.picked-up',
        item_id: 0
    });

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
        style={[styles.card, this.getCardStyle(), {width: this.props.w, height: this.props.h}]}>
        <Text style={styles.text}>{this.props.info.displayName}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    height: 93,
    margin: 3,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold'
  }
});

module.exports = QuestionCard;

