/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Nav = require('./NavigatorScene');

class gameGuideBook extends Component {
    render() {
        return (
            <Nav />

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

AppRegistry.registerComponent('gameGuideBook', () => gameGuideBook);
