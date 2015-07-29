'use strict';
var React = require('react-native');
var Button = require('react-native-button')
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var LoginScreen = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  login: function() {
    console.log("attempted login")
    this.props.navigator.push({
      title: 'MC Question',
      component: MCQuestion
    })
  },
  render: function() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'https://41.media.tumblr.com/503056c15323a104963abb03720e824f/tumblr_ns5fnpz7PQ1rzy6xko1_1280.png'}} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'https://41.media.tumblr.com/74a54c9e0d3bbbeb0db02ab2543b23e2/tumblr_ns42tjCOJF1rzy6xko1_400.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, styles.blackFont]}
                        placeholder="Username"
                        placeholderTextColor="#C7C9CF"
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.blackFont]}
                        placeholder="Password"
                        placeholderTextColor="#C7C9CF"
                        value={this.state.password}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={styles.blueFont}>Forgot your password?</Text>
                </View>
                <View style={styles.signin}>
                  <Button style={styles.whiteFont} onPress={this.login}>SIGN IN</Button>
                </View>
            </View>
        </View>
    );
  }
});

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'white'
    },
    bg: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginLeft: 75,
        width: 213,
        height: 114
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .12,
        backgroundColor: 'transparent'
    },
    mark: {
        top: 50,
        width: 70,
        height: 32
    },
    inputs: {
        marginLeft: 75,
        marginRight: 75,
        flex: .25,
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
        borderColor: 'transparent',
        backgroundColor: '#E8EBED'
    },
    input: {
        position: 'absolute',
        left: 10,
        top: 10,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      marginBottom: 10,
    },
    signin: {
      backgroundColor: '#299ED7',
      padding: 10,
      alignItems: 'center'
    },
    blueFont: {
      color: '#299ED7',
      fontWeight: 'bold'
    },
    whiteFont: {
      color: '#FFF'
    },
    blackFont: {
      color: '#000'
    }
})

module.exports = LoginScreen;

