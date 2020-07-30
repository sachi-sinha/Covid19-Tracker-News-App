import * as React from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


export default class CasesScreen extends React.Component{

  constructor(props){
    super(props);

    this.state = {
        data: ''
     }
  }

  componentDidMount = () => {
      fetch('https://api.covid19api.com/summary', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            data: responseJson["Countries"][80]
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }


   getActiveCases = () => {
     var active = this.state.data.TotalConfirmed - this.state.data.TotalDeaths - this.state.data.TotalRecovered;
     return active;
   }

  render(){
    return (
    <View style = {styles.centeredViews}>
    <View style = {styles.rectangle}>
    <Text style = {styles.title}> Total Confirmed Cases </Text>
    <Text style = {{color: "red", fontSize: 50, textAlign: "center", fontWeight: "bold"}}> {this.state.data.TotalConfirmed} </Text>
    </View>
    <View style = {styles.row}>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>New Cases </Text>
    <Text style = {{color: "red", fontSize: 40, textAlign: "center", fontWeight: "bold", paddingTop: 32}}> {this.state.data.NewConfirmed} </Text>
    </View>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>Active Cases</Text>
    <Text style = {{color: "red", fontSize: 40, textAlign:"center", fontWeight: "bold", paddingTop: 33 }}> {this.getActiveCases()} </Text>
    </View>
    </View>
    <View style = {styles.row}>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>New Deaths</Text>
    <Text style = {{color: "red", fontSize: 40, textAlign:"center", fontWeight: "bold", paddingTop: 32 }}> {this.state.data.NewDeaths} </Text>
    </View>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>New Recovered </Text>
    <Text style = {{color: "green", fontSize: 40, textAlign: "center", fontWeight: "bold"}}> {this.state.data.NewRecovered} </Text>
    </View>
    </View>
    <View style = {styles.row}>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>Deceased </Text>
    <Text style = {{color: "red", fontSize: 40, textAlign: "center", fontWeight: "bold", paddingTop: 32}}> {this.state.data.TotalDeaths} </Text>
    </View>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>Recovered </Text>
    <Text style = {{color: "green", fontSize: 40, textAlign: "center", fontWeight: "bold", paddingTop: 32}}> {this.state.data.TotalRecovered} </Text>
    </View>
    </View>
    </View>
  );
  }
}


const styles = StyleSheet.create({
  title: {
    paddingTop: 15,
    fontSize: 30,
    fontFamily: "Verdana",
    textAlign: "center",
    color: "#3b3433",
    fontWeight: "bold",
  },
  centeredViews: {
    alignItems: "center",
    paddingTop: 60,
  },
  rectangle: {
    height: 150,
    width: 360,
    margin: 10,
    borderRadius: 30,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  square :{
    height: 170,
    width: 170,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  row: {
    flexDirection: "row"
  },
  squareData: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3b3433",
    paddingTop: 10,
    textAlign: "center"
  }
})
