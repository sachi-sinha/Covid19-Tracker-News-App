import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CasesScreen from './screens/CasesScreen';
import NewsScreen from './screens/NewsScreen';
import VaccinesScreen from './screens/VaccinesScreen';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Cases') {
            iconName = focused
              ? 'ios-trending-up'
              : "ios-trending-up";
          } else if (route.name === 'General News') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }
          else if (route.name === 'Vaccine News') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={35} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#36342e',
        inactiveTintColor: 'gray',
        style: {height: 90},
        labelStyle : {fontSize: 15}
      }}
    >
        <Tab.Screen  name="Cases" component={CasesScreen} />
        <Tab.Screen name="General News" component={NewsScreen} />
        <Tab.Screen name="Vaccine News" component={VaccinesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
