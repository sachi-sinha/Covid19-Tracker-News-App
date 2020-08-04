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
import RNPickerSelect from 'react-native-picker-select';

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      country: null,
    };
  }


  componentDidMount() {
    fetch('http://newsapi.org/v2/top-headlines?q=covid&from=2020-07-20&sortBy=relevancy&apiKey=2a96fe7bbd574064863297811141a0d2&pageSize=10&page=1')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.articles });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }


  getAllCountries = () => {
    var data = require('./../data/countries.json')
    var countriesData = []

    for (item in data){
      countriesData.push({value: item, label: data[item]})
    }

    return countriesData
  }


  setUrl = (value) => {
    this.setState({country: value})
    var country = value;
    fetch('http://newsapi.org/v2/top-headlines?q=covid&from=2020-07-20&sortBy=relevancy&apiKey=2a96fe7bbd574064863297811141a0d2&pageSize=50&page=1&country=' + country)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.articles });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
    });
  }

  checkImageUrl = (url) => {
    if (url) {return url.toString(); }
    else {return 'https://image.winudf.com/v2/image1/aHUuYmthbG1hbi5hbmRyb2lkLmFwcC53aGl0ZXNjcmVlbl9zY3JlZW5fMV8xNTY3MDI0NzUwXzAwMw/screen-1.jpg?fakeurl=1&type=.jpg';}
  }


  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  }


  render() {
    var countryData = this.getAllCountries()
    return (
      <SafeAreaView>
      <RNPickerSelect
            onValueChange={(value) => this.setUrl(value)}
            items = {countryData}
            style = {pickerSelectStyles}
            placeholder = {{label: "World"}}
      />
      <View style = {{paddingTop: 15, marginBottom: 200}}>
      <Text style = {styles.title}>General News</Text>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data}
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
};

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
    backgroundColor: "#419bcc",
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
  },

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        paddingTop: 15,
        fontWeight: "bold",
        textAlign: "right",
        paddingHorizontal: 15,
        color: '#c96e06',
        fontFamily: "Verdana"
    },
});
