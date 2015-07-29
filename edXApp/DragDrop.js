'use strict';
var React = require('react-native');
var Button = require('react-native-button');
var QuestionCard = require('./QuestionCard');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text
} = React;
var coords = [];
var list = ['ans1', 'ans2'];

var DragDrop = React.createClass({
  componentDidMount: function() {
    setTimeout(this.record)
  },
  record: function() {
    list.forEach(this.debug);
  },
  debug: function(value) {
    this.refs[value].measure((ox, oy, width, height, px, py) => {
        var measurements = [];
        measurements["x"] = px;
        measurements["y"] = py;
        measurements["width"] = width;
        measurements["height"] = height;
        coords[value] = measurements;
      });
  },
  submit: function() {
    var list = ['q1', 'q2'];
    console.log("q1: " + this.refs['q1'].ans);
    console.log("q2: " + this.refs['q2'].ans);
  },
  getAnswers: function() {
    var x = <View ref={list[0]} style={styles.card}><Text>answer 1</Text></View>;
    return <View>{x}<View ref='ans2' style={styles.card}><Text>answer 2</Text></View></View>;
  },
  render: function() {
    var answers = this.getAnswers();
    return (
      <View ref='container' style={styles.container}>
        {answers}
        <View ref='questions' style={styles.questions}>
          <QuestionCard text='q1' coords={coords} ref='q1'/>
          <QuestionCard text='q2' coords={coords} ref='q2'/>
        </View> 
        <Button style={styles.button} onPress={this.submit}>
          Submit
        </Button> 
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
  questions: {
    flexDirection: 'row'
  },
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 150,
    margin: 5,
    padding: 10,
    backgroundColor: 'grey'
  },
  button: {
  }
});

module.exports = DragDrop;
