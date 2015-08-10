'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var InitialScreen = require('./DragDrop')

var edXApp = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch("http://demo0756287.mockable.io/test")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          drag: responseData.drag,
          drop: responseData.drop,
          solution: responseData.solution,
          loaded: true
        });
      })
      .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return this.renderAll()
  },

  renderLoadingView: function() {
    return (
      <View style={styles.background}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },
  renderAll: function() {
    return (
      <NavigatorIOS
        initialRoute={{
          title: 'Initial',
          component: InitialScreen,
          passProps: { myDrop: this.state.drop, myDrag: this.state.drag, mySolution: this.state.solution}  
        }}
        style={styles.container}/>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('edXApp', () => edXApp);

