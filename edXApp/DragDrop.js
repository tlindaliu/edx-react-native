'use strict';
var React = require('react-native');
var Button = require('react-native-button');
var QuestionCard = require('./QuestionCard');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
//var CookieManager = require('react-native-cookies');
var {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView
} = React;

var DragDrop = React.createClass({
  getInitialState: function() {
    this.coords=[];
    return {
      drop: [], 
      drag: [], 
      img: null
    }
  },
  componentDidMount: function() {
    fetch(this.props.runtime.handlerUrl(this, "get_data"))
      .then((response) => response.json())
      .then((responseData) => {
        /*
        CookieManager.getAll((err, res) => {
          this.csrf = err['csrftoken'];
        });
        */
        this.setState({
          title: responseData.title,
          drag: responseData.items,
          drop: responseData.zones,
          loaded: true
        });

        setTimeout(this.record);
        this.publishEvent({event_type: 'xblock.drag-and-drop-v2.loaded'});

      }).done();
  },
  record: function() {
    this.state.drop.forEach(this.setUpCoords);
  },
  setUpCoords: function(value) {
    this.refs[value.id].measure((ox, oy, width, height, px, py) => {
        var measurements = [];
        measurements["x"] = px;
        measurements["y"] = py;
        measurements["width"] = width;
        measurements["height"] = height;
        this.coords[value.title] = measurements;
      });
  },
  submit: function() {
    /*
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
    */  
  },
  reset: function() {
    this.setState({
      img: null 
    });  
    for(var i = 0; i < this.state.drag.length; i++) {
      this.refs[this.state.drag[i].id].reset();
    }
  },
  publishEvent: function(data) {
    fetch(this.props.runtime.handlerUrl(this, "publish_event"), {
      method: 'post',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //'X-CSRFToken': this.props.parent.csrf
          },
      body: JSON.stringify(data)
    }).done();
  },
  render: function() {
    return (
      <View ref='container' style={styles.container}>
        <Text style={styles.text2}>{this.state.title}</Text>

        {this.state.drop.map(function(item) {
          return (
            <View 
              ref={item.id} 
              key={item.id} 
              style={[styles.card, {height: windowSize.height * .5 / this.state.drop.length}]}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          );
        }, this)}      

        <View ref='questions' style={styles.questions}>
        {this.state.drag.map(function(item) {
          return (
            <QuestionCard 
              ref={item.id}
              key={item.id} 
              info={item}
              parent={this}
              w={windowSize.width * .85 / this.state.drag.length} 
              h={windowSize.height * .3 / this.state.drop.length}/>
          );
        }, this)}
        </View>

        <View ref='buttons' style={styles.buttons}>
          <Button style={styles.button} onPress={this.submit}>
            Submit
          </Button>
          <Button style={styles.button} onPress={this.reset}>
            Reset
          </Button> 
          <Image style={styles.img} source={{uri: this.state.img}}/>
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
