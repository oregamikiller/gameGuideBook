'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
        Image,
        ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        View,
        TextInput,
        BackAndroid,
        WebView,
        } = ReactNative;
import TabBar from 'react-native-xtabbar';

var CustomWebView = require('./CustomWebView');

var MainList = React.createClass({
    statics: {
        title: '<ListView>',
        description: 'Performant, scrollable list of data.'
    },

    componentDidMount: function () {
        var self = this;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            if (self.props.navigator.getCurrentRoutes().length > 1) {
                return true;
            } else {
                return false;
            }
        });
        //this.fetchData();
    },
    fetchData: function () {
        switch(currentIndex){
            case 0: dataUrl = 'http://semidream.com/trophydata/?platForm=ps4';break;
            case 1: dataUrl = 'http://semidream.com/trophydata/?platForm=ps3';break;
            case 2: dataUrl = 'http://semidream.com/trophydata/?platForm=psvita';break;
            case 3: dataUrl = 'http://semidream.com/trophydata/title/' + 1;break;
            default : dataUrl = 'http://semidream.com/trophydata/title/' + 1;break;
        }
        fetch(dataUrl)
            .then((response) => response.json())
            .then((responseData) => {
                dataList[currentIndex] = [].concat(responseData);
                if (responseData.length < 20) { hasMore = false;
                } else {
                    hasMore = true;
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataList[currentIndex]),
                    loaded: true,
                });
            }).catch(console.log)
            .done();
    },

    fetchNext: function () {
        switch(currentIndex){
            case 0: dataUrl = 'http://semidream.com/trophydata/?platForm=ps4&page=';break;
            case 1: dataUrl = 'http://semidream.com/trophydata/?platForm=ps3&page=';break;
            case 2: dataUrl = 'http://semidream.com/trophydata/?platForm=psvita&page=';break;
            case 3: dataUrl = 'http://semidream.com/trophydata/title/' + 1;break;
            default : dataUrl = 'http://semidream.com/trophydata/title/' + 1;break;
        }
        let page = parseInt(this.state.dataSource.getRowCount() / 20) + 1;
        if (requestFinished && hasMore && !searchFlag) {
            requestFinished = false;
            fetch(dataUrl + page)
                .then((response) => response.json())
                .then((responseData) => {
                    requestFinished = true;
                    console.log(responseData.length, responseData);
                    if (responseData.length < 20) { hasMore = false;}
                    dataList[currentIndex] = dataList[currentIndex].concat(responseData);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(dataList[currentIndex]),
                        loaded: true,
                    });

                }).catch(console.log)
                .done();
        }
    },
    getInitialState: function () {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false,
        }
    },


    render: function () {
        var self = this;
        return (
            <View style={styles.container}>
                <TextInput ref = "searchInput"
                           style={styles.searchbox}
                           placeholder="请输入想搜索游戏的标题"
                           returnKeyType="search"
                           keyboardType="default"
                           onChangeText={text => this.SearchTitle(text)}
                    />
                <TabBar
                    style={styles.content}
                    onItemSelected={(index) => {console.log(`current item's index is ${index}`);
                        currentIndex = index;
                        this.refs.searchInput.setNativeProps({text: ''});
                        searchFlag = false;
                        hasMore = false;
                        this.fetchData();
                        self.setState({
                        dataSource: self.state.dataSource.cloneWithRows(dataList[currentIndex]),
                        loaded: true,
                    });
                        }}
                    >
                    <TabBar.Item
                        icon={require('./img/tabbaricon1.jpg')}
                        selectedIcon={require('./img/tabbaricon1.jpg')}
                        onPress={() => {
            // do sth
        }}
                        title='PS4'>

                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this._renderRow}
                                enableEmptySections={true}
                                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                                renderSeparator={this._renderSeperator}
                                onEndReached={this.fetchNext}
                                onEndReachedThreshold={20}
                                />

                    </TabBar.Item>

                    <TabBar.Item
                        icon={require('./img/tabbaricon2.png')}
                        selectedIcon={require('./img/tabbaricon2.png')}
                        onPress={() => {
                    }}
                        title='PS3'>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            enableEmptySections={true}
                            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                            renderSeparator={this._renderSeperator}
                            onEndReached={this.fetchNext}
                            onEndReachedThreshold={20}
                            />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={require('./img/tabbaricon3.jpg')}
                        selectedIcon={require('./img/tabbaricon3.jpg')}
                        title='PSV'>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            enableEmptySections={true}
                            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                            renderSeparator={this._renderSeperator}
                            onEndReached={this.fetchNext}
                            onEndReachedThreshold={20}
                            />

                    </TabBar.Item>

                    <TabBar.Item
                        icon={require('./img/tabbaricon4.png')}
                        selectedIcon={require('./img/tabbaricon4.png')}
                        title='我的'>
                        <View style={{padding: 30}}>
                            <Text>
                                用户注册登录后自定义功能开发中,有对本应用的意见和建议可以联系madaow@163.com
                            </Text>
                        </View>
                    </TabBar.Item>
                </TabBar>
            </View>
        );
    },

    _renderRow: function (rowData:string, sectionID:number, rowID:number) {
        var rowHash = Math.abs(hashCode(rowData));
        if (rowData.pic_url) {
            rowData.desc = '来源: ' + rowData.source;
            rowData.picUrl = rowData.pic_url;
        }
        if (rowData.picUrl === null) {
            rowData.picUrl = 'http://p.pstatp.com/thumb/ca20003cd127d9542be';
        }
        return (
            <TouchableHighlight onPress={() => this.pressRow(rowID)}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={{uri:rowData.picUrl}}/>
                        <Text style={styles.text}>
                            {rowData.title }{"\n"}{rowData.desc}{"\n"}{rowData.plantForm}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },

    SearchTitle: function (text) {
        if (text.length >= 1) {
            searchFlag = true;
            dataUrl = 'http://semidream.com/trophydata/title/';
            fetch(dataUrl + text)
                .then((response) => response.json())
                .then((responseData) => {
                    dataList[currentIndex] = responseData;
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(dataList[currentIndex]),
                        loaded: true,
                    });
                }).catch(console.log)
                .done();
        } else {
            searchFlag = false;
            this.fetchData();
        }
    },

    pressRow: function (rowID:number) {

            this.props.navigator.push({
                        name: 'detail',
                        gameid: dataList[currentIndex][rowID].id
                    });
    },

    _renderSeperator: function (sectionID:number, rowID:number, adjacentRowHighlighted:bool) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
                />
        );
    }


});

var dataList0 = [];
var dataList1 = [];
var dataList2 = [];
var dataList3 = [];
var dataUrl = '';
var dataList = [dataList0, dataList1, dataList2, dataList3]
var hasMore= true;
var searchFlag = false;
var requestFinished = true;
var currentIndex = 0;

var hashCode = function (str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    searchbox: {
        marginTop: 20,
        padding: 3,
        fontSize: 20,
        borderColor: 'red',
        borderWidth: 1,
        height: 30,
        paddingLeft: 8,
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 100,
        height: 55,
        margin: 5,
    },
    text: {
        margin: 5,
        flex: 1,
    },
});

module.exports = MainList;
