'use strict';
var React = require('react');
var QuestionCard = require('./QuestionCard');
var coords = [];

var DragDrop = React.createClass({
  getInitialState: function() {
    return { drop: ['ans1', 'ans2'], drag : ['q1', 'q2', 'q3', 'q4'], solution: {"q1": "ans1", "q2": "ans2"}, img: null}
  },
  componentDidMount: function() {
    console.log("got here");
    $.ajax('/handler/drag-and-drop-v2-scenario.drag-and-drop-v2.d0.u0/get_data/?student=student_1&', {
      dataType: 'json'
    }).done(function(data){
      console.log("working");
      console.log(data);
    });

    this.record();
  },
  record: function() {
    this.state.drop.forEach(this.setUpCoords);
  },
  setUpCoords: function(value) {
    var node = React.findDOMNode(this.refs[value]);
    var measurements = [];
        measurements["x"] = node.offsetLeft;
        measurements["y"] = node.offsetTop;
        measurements["width"] = node.clientWidth;
        measurements["height"] = node.clientHeight;
        coords[value] = measurements;
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
    return <img style={styles.img} src={this.state.img}/>;
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
      x.push(<div ref={d} key={d} style={styles.answers}>{d}</div>)
    }
    return <div>{x}</div>;
  },
  getQuestions: function() {
    var x = [];
    for(var i = 0; i < this.state.drag.length; i++) {
      var d = this.state.drag[i];
      x.push(<QuestionCard text={d} key={d} coords={coords} ref={d}/>)
    }
    return <div>{x}</div> 
  },
  render: function () {
    var answers = this.getAnswers();
    var questions = this.getQuestions();
    var check = this.getCheck();
    return (
      <div ref='container' style={styles.container}>
        [insert question]
        {answers}
        {questions}
        <div ref='buttons' style={styles.buttons}>
          <button onClick={this.submit}>Submit</button>
          <button onClick={this.reset}>Reset</button>
          {check}
        </div>
      </div>
    )}
});

var styles = {
  img: {
    width: 25,
    height: 25,
    marginTop: 12
  },
  container: {
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    margin: 'auto'
  },
  answers: {
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#000',
    width: 300,
    height: 150,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
    
  }
}
         
React.render(<DragDrop/>, document.getElementById('content'));