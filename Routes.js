import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

var TrophyListView = require('./TrophyListView');
var MainList = require('./MainList');

const styles = StyleSheet.create({
    navBarStyle: {
        height: 55,
    }
});

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="main" component={MainList} title="攻略目录" rightTitle="搜索" onRight={()=>Actions.detail()} navigationBarStyle={styles.navBarStyle} />
        <Scene key="detail" component={TrophyListView} title="奖杯列表" navigationBarStyle={styles.navBarStyle}/>
    </Scene>
);



module.exports = scenes;
