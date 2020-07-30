import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';


export default class NewsScreen extends React.Component{

  state = {
      data: ''
   }

  componentDidMount = () => {
      fetch('https://api.smartable.ai/coronavirus/news/global', {
         method: 'GET',
         headers: {'Subscription-Key': '3009d4ccc29e4808af1ccc25c69b4d5d'},
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            data: responseJson['news']
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }

  getAllNews = () => {

    var newsLink = new Array();
    var title = new Array();
    var images = new Array();
    var index = 0;

    for (var i = 0; i < this.state.data.length; i++ ){
      if ((this.state.data[i].ampWebUrl != null)
      && (this.state.data[i].images != null)){
        newsLink[index] = this.state.data[i].ampWebUrl;
        title[index] = this.state.data[i].title;
        images[index] = this.state.data[i].images[0].url;
        index += 1
      }

      if (newsLink.length >= 5){
        break;
      }
    }
    
    var data = [newsLink, title, images];
    return data;
  }

  render(){

    var data = this.getAllNews();
    var url = data[0];
    var title = data[1];
    var images = data[2];

    return (
      <View style = {{paddingTop: 50}}>
      <Text style = {styles.title}>Latest News</Text>
      <TouchableOpacity onPress={ ()=> Linking.openURL(data[0][0]) } style = {styles.rectangle}>
      <View style = {{flexDirection: "row"}}>
        <Text style = {styles.text}>{title[0]}</Text>
        <Image
        style = {styles.image}
        source = {{uri: images[0]}}
      />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={ ()=> Linking.openURL(data[0][1]) } style = {styles.rectangle}>
      <View style = {{flexDirection: "row"}}>
        <Text style = {styles.text}>{title[1]}</Text>
        <Image
        style = {styles.image}
        source = {{uri: images[1]}}
      />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={ ()=> Linking.openURL(data[0][2]) } style = {styles.rectangle}>
      <View style = {{flexDirection: "row"}}>
        <Text style = {styles.text}>{title[2]}</Text>
        <Image
        style = {styles.image}
        source = {{uri: images[2]}}
      />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={ ()=> Linking.openURL(data[0][3]) } style = {styles.rectangle}>
      <View style = {{flexDirection: "row"}}>
        <Text style = {styles.text}>{title[3]}</Text>
        <Image
        style = {styles.image}
        source = {{uri: images[3]}}
      />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={ ()=> Linking.openURL(data[0][4]) } style = {styles.rectangle}>
      <View style = {{flexDirection: "row"}}>
        <Text style = {styles.text}>{title[4]}</Text>
        <Image
        style = {styles.image}
        source = {{uri: images[4]}}
      />
      </View>
      </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  title: {
    fontSize: 50,
    fontFamily:"Verdana",
    fontWeight: "bold",
    paddingTop: 12,
    color: "#3b3433",
    paddingLeft: 15,
  },

  rectangle: {
    height: 120,
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
    width: 120,
    marginTop:8,
    marginRight: 10,
    marginBottom: 6,
    resizeMode: "contain"
  },

  text: {
    padding: 20,
    color: "white",
    flex: 1,
    fontSize: 16.5,
  }
})
