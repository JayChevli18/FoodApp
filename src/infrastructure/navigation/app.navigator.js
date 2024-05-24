import React, { useContext } from 'react';
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
import { Button } from 'react-native-paper';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurant.context';
import { FavouritesContextProvider } from '../../services/favourites/favourites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import LottieView from 'lottie-react-native';
import { SettingsNavigator } from './settings.navigator';

const Tab = createMaterialBottomTabNavigator();


export const AppNavigator = () => {
  return (


    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>

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
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>

  )
};


const styles = StyleSheet.create({
  button: { width: 150, height: 50, justifyContent: "center" },
})