'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
        Navigator,
        StyleSheet,
        Platform,
        BackAndroid,
        } = ReactNative;

var Routes         = require('./Routes');
var ListScence     = require('./MainList');
var TrophyListView = require('./TrophyListView');
var CustomWebView  = require('./CustomWebView')

var NavigatorScene = React.createClass({

    componentDidMount: function () {

        BackAndroid.addEventListener('hardwareBackPress', function () {
            return false;
        });
    },
    renderScene: function (route, navigator) {
        if (route && route.name == 'detail') {
            return <TrophyListView gameid={route.gameid} navigator={navigator}/>
        } else if (route && route.name == 'webPage') {
            return <CustomWebView targetUrl={route.targetUrl} navigator={navigator}/>
        }
        return ( <ListScence navigator={navigator}/> );
    },

    render: function () {
        var initialRoute = Routes.InitScene;

        return (<Navigator
            ref={(navigator)=>this.navigator=navigator}
            style={styles.container}
            initialRoute={initialRoute}
            renderScene={this.renderScene}
            navigator={navigator}/>)
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = NavigatorScene;
