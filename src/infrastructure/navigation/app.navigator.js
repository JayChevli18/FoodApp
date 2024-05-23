import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RestaurantsNavigator } from './restaurants.navigator';
import { MapScreen } from '../../features/map/map.screen';
const Tab = createMaterialBottomTabNavigator();

const Settings = () => (
    <SafeAreaView>
      <Text>Settings</Text>
      <Icon name="map" size={20} color="red"></Icon>
    </SafeAreaView>
  );
  



export const AppNavigator=()=>{
    return(
    <NavigationContainer>
    <Tab.Navigator
      activeColor='cyan'
      inactiveColor='white'
      activeIndicatorStyle={{ backgroundColor: "grey" }}
      barStyle={{ backgroundColor: "black", height: 70 }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Restaurants") {
            iconName = "restaurant";
          } else if (route.name === "Settings") {
            iconName = "settings"; // Corrected icon name
          } else if (route.name === "Maps") {
            iconName = "map";
          }

          return <Icon name={iconName} size={25} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Maps" component={MapScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  </NavigationContainer>
)};