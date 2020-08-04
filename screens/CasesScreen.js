import * as React from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';


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
            countriesData: responseJson["Countries"],
            data: responseJson["Global"],
            globalData: responseJson["Global"],
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

   getAllCountries = () => {
     var countries = [{value: 200, label: "World"}]

     for(country in this.state.countriesData){
       countries.push({value: country, label: this.state.countriesData[country].Country})
     }

     return countries;
   }

   fetchCountryData = (index) => {
     if (index != 200){
       this.setState({data: this.state.countriesData[index]})
     }
     else{
       this.setState({data: this.state.globalData})
     }
   }

  render(){

    var countryItems = this.getAllCountries()

    return (
    <View style = {styles.centeredViews}>
    <DropDownPicker
    items={countryItems}
    labelStyle={{
    fontSize: 25,
    }}
    selectedLabelStyle = {styles.selectedData}
    placeholder = {"World"}
    placeholderStyle = {styles.selectedData}
    style = {styles.dropdownText}
    containerStyle={{width: 390, height: 60}}
    onChangeItem={item => this.fetchCountryData(item.value)}
    />
    <View style = {styles.rectangle}>
    <Text style = {styles.title}> Total Confirmed Cases </Text>
    <Text style = {styles.totalConfirmed}> {this.state.data.TotalConfirmed} </Text>
    </View>
    <View style = {styles.row}>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>New Cases </Text>
    <Text style = {styles.numbersRed}> {this.state.data.NewConfirmed} </Text>
    </View>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>Active Cases</Text>
    <Text style = {styles.numbersRed}> {this.getActiveCases()} </Text>
    </View>
    </View>
    <View style = {styles.row}>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>New Deaths</Text>
    <Text style = {styles.numbersRed}> {this.state.data.NewDeaths} </Text>
    </View>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>New Recovered </Text>
    <Text style = {styles.numbersGreen}> {this.state.data.NewRecovered} </Text>
    </View>
    </View>
    <View style = {styles.row}>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>Deceased </Text>
    <Text style = {styles.numbersRed}> {this.state.data.TotalDeaths} </Text>
    </View>
    <View style = {styles.square}>
    <Text style = {styles.squareData}>Recovered </Text>
    <Text style = {styles.numbersGreen}> {this.state.data.TotalRecovered} </Text>
    </View>
    </View>
    </View>
  );
  }
}


const styles = StyleSheet.create({

  dropdownText: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5
  },

  selectedData: {
    color: "#3b3433",
    fontWeight: "bold"
  },

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
    width: 380,
    margin: 10,
    borderRadius: 10,
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
    height: 150,
    width: 180,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
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
    fontSize: 23,
    fontWeight: "bold",
    color: "#3b3433",
    paddingTop: 10,
    textAlign: "center"
  },

  totalConfirmed: {
    color: "red",
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
  },

  numbersGreen: {
    color: "green",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 25,
  },

  numbersRed: {
    color: "red",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 25,
  }

})
