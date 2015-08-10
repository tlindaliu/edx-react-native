'use strict';
var React = require('react-native');
var Button = require('react-native-button');
var QuestionCard = require('./QuestionCard');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView
} = React;
var coords = [];

var DragDrop = React.createClass({
  getInitialState: function() {
        return { drop: this.props.myDrop, drag: this.props.myDrag, solution: this.props.mySolution, img: null };
  },
  componentDidMount: function() {
    setTimeout(this.record)
  },
  record: function() {
    this.state.drop.forEach(this.setUpCoords);
  },
  setUpCoords: function(value) {
    this.refs[value].measure((ox, oy, width, height, px, py) => {
        var measurements = [];
        measurements["x"] = px;
        measurements["y"] = py;
        measurements["width"] = width;
        measurements["height"] = height;
        coords[value] = measurements;
      });
  },
  showAnswer: function() {
    for(var i = 0; i < this.state.drag.length; i++) {
      var x = coords[this.state.solution[this.state.drag[i]]]["x"];
      var y = coords[this.state.solution[this.state.drag[i]]]["y"];
    }
  },
  submit: function() {
    for(var i = 0; i < this.state.drag.length; i++) {
      console.log(this.state.drag[i] + ": " + this.refs[this.state.drag[i]].ans);
    }
    for(var i = 0; i < this.state.drag.length; i++) {
      if (this.refs[this.state.drag[i]].ans != this.state.solution[this.state.drag[i]]) {
        this.setState({ img: 'https://40.media.tumblr.com/dde1102ac057cfd4bf81af930089204b/tumblr_nshkou228H1rzy6xko1_75sq.png' });  
        return;
      }
    }
    this.setState({ img: 'https://40.media.tumblr.com/c65c1c84fe0ef22206a580177be80ffa/tumblr_nshkou228H1rzy6xko2_75sq.png' });  

  },
  getCheck: function() {
    return <Image style={styles.img} source={{uri: this.state.img}}/>;
  },
  reset: function() {
    this.setState({ img: null });  
    for(var i = 0; i < this.state.drag.length; i++) {
      this.refs[this.state.drag[i]].reset();
    }
  },
  getAnswers: function() {
    var x = [];
    for(var i = 0; i < this.state.drop.length; i++) {
      var d = this.state.drop[i];
      x.push(<View ref={d} key={d} style={[styles.card, {height: windowSize.height * .5 / this.state.drop.length}]}><Text style={styles.text}>{d}</Text></View>)
    }
    return <View>{x}</View>;
  },
  getQuestions: function() {
    var x = [];
    for(var i = 0; i < this.state.drag.length; i++) {
      var d = this.state.drag[i];
      x.push(<QuestionCard text={d} key={d} w={windowSize.width * .85 / this.state.drag.length} h={windowSize.height * .3 / this.state.drop.length} coords={coords} ref={d}/>)
    }
    return <View ref='questions' style={styles.questions}>{x}</View> 
  },
  render: function() {
    var answers = this.getAnswers();
    var questions = this.getQuestions();
    var check = this.getCheck();
    return (
      <View ref='container' style={styles.container}>
        <Text style={styles.text2}>[insert question]</Text>
        {answers}
        {questions}
        <View ref='buttons' style={styles.buttons}>
          <Button style={styles.button} onPress={this.submit}>
            Submit
          </Button>
          <Button style={styles.button} onPress={this.reset}>
            Reset
          </Button> 
          {check}
        </View>
      </View>
      
    );
  }
});

var styles = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    marginTop: 12
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 20
  },
  questions: {
    flexDirection: 'row'
  },
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  button: {
    padding: 15
  },
  text2: {
    marginTop: 25
  },
  text: {
    fontWeight: 'bold'
  }
});

module.exports = DragDrop;
