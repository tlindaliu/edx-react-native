'use strict';
var React = require('react-native');
var Button = require('react-native-button')
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var LoginScreen = require('./LoginScreen')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var InitialScreen = React.createClass({
  gotToSignUp: function() {
    console.log("press")
  },
  goToSignIn: function() {
    this.props.navigator.push({
      title: 'Sign in',
      component: LoginScreen
    })
  },
  render: function() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'https://41.media.tumblr.com/683643c593ab05611ccc177b08c08e13/tumblr_ns41kv1MYy1rzy6xko1_1280.png'}} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'https://41.media.tumblr.com/74a54c9e0d3bbbeb0db02ab2543b23e2/tumblr_ns42tjCOJF1rzy6xko1_400.png'}} />
            </View>
            <View style={styles.signin}>
                <Button style={styles.whiteFont} onPress={this.goToSignUp}>Sign up and start learning</Button>
            </View>
            <View style={styles.signup}>
                <Button style={styles.whiteFont} onPress={this.goToSignIn}>Already have an account? Sign in</Button>
            </View>
        </View>
    );
  }
});

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .3,
        backgroundColor: 'transparent'
    },
    mark: {
        bottom: 80,
        width: 141,
        height: 65
    },
    signin: {
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#299ED7',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .05
    },
    whiteFont: {
      color: '#FFF'
    }
})

module.exports = InitialScreen;

