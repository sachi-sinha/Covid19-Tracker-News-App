import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Linking,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default class NewsScreen extends React.Component{


  constructor() {
    super();
    this.state = {
      loading: false,
      isListEnd: false,
      serverData: [],
      fetching_from_server: false,
    };
    this.offset = 1;
  }


  componentDidMount() {
    this.loadMoreData();
  }


  loadMoreData = () => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({ fetching_from_server: true }, () => {
        fetch('http://newsapi.org/v2/top-headlines?q=covid+vaccine&language=en&sortBy=relevancy&apiKey=2a96fe7bbd574064863297811141a0d2&pageSize=10&page=' + this.offset)
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson["articles"]) {
              if (responseJson["articles"].length > 0){
                this.offset = this.offset + 1;
                this.setState({
                  serverData: [...this.state.serverData, ...responseJson['articles']],
                  fetching_from_server: false,
                });
              }
              else{
                this.setState({
                  fetching_from_server: false,
                  isListEnd: true,
                });
              }
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    }
  };


  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black"/>
        ) : null}
      </View>
    );
  }


  checkImageUrl = (url) => {
    if (url) {return url.toString(); }
    else {return 'https://image.winudf.com/v2/image1/aHUuYmthbG1hbi5hbmRyb2lkLmFwcC53aGl0ZXNjcmVlbl9zY3JlZW5fMV8xNTY3MDI0NzUwXzAwMw/screen-1.jpg?fakeurl=1&type=.jpg';}
  }


  render() {
    return (
      <SafeAreaView>
      <View style = {{paddingTop: 50, marginBottom: 120}}>
      <Text style = {styles.title}>Vaccine News</Text>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.serverData}
            onEndReached={() => this.loadMoreData()}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={ ()=> Linking.openURL(item.url) } style = {styles.rectangle}>
                <View style = {{flexDirection: "row"}}>
                <Text style = {styles.text}>{item.title}</Text>
                <Image style = {styles.image}
                source = {{uri: this.checkImageUrl(item.urlToImage)}} />
                </View>
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
        )}
      </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({

  title: {
    fontSize: 50,
    fontFamily:"Verdana",
    fontWeight: "bold",
    color: "#3b3433",
    paddingLeft: 12,
  },

  rectangle: {
    height: 180,
    width: 390,
    marginTop: 10,
    marginLeft: 13,
    marginBottom: 5,
    borderRadius: 20,
    backgroundColor: "#60a361",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  image:{
    height: 100,
    width: 150,
    marginTop: 30,
    marginRight: 13,
    marginBottom: 6,
    resizeMode: "contain"
  },

  text: {
    padding: 20,
    color: "white",
    flex: 1,
    fontSize: 19,
    lineHeight: 26,
    fontFamily: "Verdana"
  }
});
