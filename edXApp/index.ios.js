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
  render: function() {
    return (
      <NavigatorIOS
        initialRoute={{
          title: 'Initial',
          component: InitialScreen,
          passProps: { runtime: RuntimeProvider.getRuntime(1) }
        }}
        style={styles.container}/>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

var RuntimeProvider = (function() {
  var getRuntime = function(version) {
    if (!this.versions.hasOwnProperty(version)) {
      throw 'Unsupported XBlock version: ' + version;
    }
    return this.versions[version];
  };

  var versions = {
    1: {
      handlerUrl: function(block, handlerName, suffix, query) {
        suffix = typeof suffix !== 'undefined' ? suffix : '';
        query = typeof query !== 'undefined' ? query : '';
        var usage = "drag-and-drop-v2-react.drag-and-drop-v2.d0.u0"; //need to fix
        var baseUrl = "/handler/";
        var studentId = "student_1";
        /*
        var url_selector = $(block).data('url_selector');
        if (url_selector !== undefined) {
            baseUrl = window[url_selector];
        }
        else {baseUrl = handlerBaseUrl;}
        */

        // studentId and handlerBaseUrl are both defined in block.html
        return ('http://127.0.0.1:8000' +
                baseUrl + usage +
                           "/" + handlerName +
                           "/" + suffix +
                   "?student=" + studentId +
                           "&" + query);
      },
    }
  };

  return {
    getRuntime: getRuntime,
    versions: versions
  };
}());

AppRegistry.registerComponent('edXApp', () => edXApp);

