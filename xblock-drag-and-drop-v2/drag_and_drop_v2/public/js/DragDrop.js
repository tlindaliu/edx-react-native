'use strict';
var React = require('react');
var QuestionCard = require('./QuestionCard');

var Initializer = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    }
  },
  componentDidMount: function() {
    setInitializer(this);
  },
  render: function() {
    return this.state.loaded ? <DragDrop runtime={this.state.rtime} element={this.state.elem}/> : <div style={styles.container}>Loading...</div>
  }
});

var DragDrop = React.createClass({
  getInitialState: function() {
    this.coords = [];
    return {
      drop: [], 
      drag : [], 
      img: null, 
      feedback: null
    }
  },
  componentDidMount: function() {
    console.log(this.props.element);
    $.ajax({
      url: this.props.runtime.handlerUrl(this.props.element, 'get_data'), 
      dataType: 'json',
      success: function(data) {
        this.setState({
          drop: data.zones,
          drag: data.items
        });

        this.record();
        this.publishEvent({event_type: 'xblock.drag-and-drop-v2.loaded'});
        
      }.bind(this),
    });
  },
  record: function() {
    this.state.drop.forEach(this.setUpCoords);
  },
  setUpCoords: function(value) {
    var node = React.findDOMNode(this.refs[value.id]);
    var measurements = [];
        measurements["x"] = node.offsetLeft;
        measurements["y"] = node.offsetTop;
        measurements["width"] = node.clientWidth;
        measurements["height"] = node.clientHeight;
        this.coords[value.title] = measurements;
  },
  submit: function() {
    /* for(var i = 0; i < this.state.drag.length; i++) {
      console.log(this.state.drag[i].displayName + ": " + this.refs[this.state.drag[i].displayName].ans);
    }
    for(var i = 0; i < this.state.drag.length; i++) {
      if (this.refs[this.state.drag[i].displayName].ans != this.state.solution[this.state.drag[i].displayName]) {
        this.setState({ img: 'https://40.media.tumblr.com/dde1102ac057cfd4bf81af930089204b/tumblr_nshkou228H1rzy6xko1_75sq.png' });  
        return;
      }
    }
    this.setState({ img: 'https://40.media.tumblr.com/c65c1c84fe0ef22206a580177be80ffa/tumblr_nshkou228H1rzy6xko2_75sq.png' }); */ 
  },
  reset: function() {
    this.setState({ 
      img: null,
      visi: false
    });  
    for(var i = 0; i < this.state.drag.length; i++) {
      this.refs[this.state.drag[i].id].reset();
    }
  },
  setFeedback: function(text) {
    this.setState({
      visi: true,
      feedback: text
    });

    this.publishEvent({
        event_type: 'xblock.drag-and-drop-v2.feedback.opened',
        content: text
    });
  },
  publishEvent: function(data) {
    $.ajax({
        type: 'POST',
        url: this.props.runtime.handlerUrl(this.props.element, 'publish_event'),
        data: JSON.stringify(data)
    });
  },
  onc: function() {
    this.setState({
      visi: false
    });

    this.publishEvent({
        event_type: 'xblock.drag-and-drop-v2.feedback.closed',
        content: __state.state.feedback,
        manually: false
    });
  },
  render: function () {
    return (
      <div ref='container' style={styles.container}>
        <div ref='feedback' style={{
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: '#000',
          width: 300,
          height: 50,
          margin: 5,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          visibility: this.state.visi ? 'visible' : 'hidden'
        }}
        onClick={this.onc}>{this.state.feedback}</div>
        {this.state.drop.map(function(item) {
          return (
            <div 
              ref={item.id} 
              key={item.id} 
              style={styles.answers}>
              {item.title}
            </div>
          );
        }, this)}

        {this.state.drag.map(function(item) {
          return (
            <QuestionCard 
              ref={item.id}
              key={item.id} 
              info={item}
              parent={this}/>
          );
        }, this)}

        <div ref='buttons' style={styles.buttons}>
          <button onClick={this.submit}>Submit</button>
          <button onClick={this.reset}>Reset</button>
          <img style={styles.img} src={this.state.img}/>
        </div>
      </div>
    )
  }
});

var styles = {
  img: {
    width: 25,
    height: 25,
    marginTop: 12
  },
  contain: {
    backgroundColor: 'black'
  },
  container: {
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  feedback: {
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#000',
    width: 300,
    height: 50,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    visibility: 'hidden'
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

React.render(<Initializer/>, document.getElementById('content'));





