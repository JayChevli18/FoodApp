import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RestaurantScreen } from './src/features/restaurants/screens/restaurants.screens';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/infrastructure/theme';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { restaurantsRequest } from "./src/services/restaurants/restaurants.service"
import { RestaurantsContextProvider } from './src/services/restaurants/restaurant.context';
import { LocationContextProvider } from './src/services/location/location.context';
import { Navigation } from './src/infrastructure/navigation';
import { FavouritesContextProvider } from './src/services/favourites/favourites.context';
import { initializeApp, setLogLevel } from 'firebase/app';
import { AuthenticationContext, AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import SplashScreen from './src/components/animations/splashscreen';

const firebaseConfig = {
  apiKey: "AIzaSyAj_n7mVKkUWdzHCDvZj9f-3rjXIPQuhzI",
  authDomain: "foodapp-424112.firebaseapp.com",
  projectId: "foodapp-424112",
  storageBucket: "foodapp-424112.appspot.com",
  messagingSenderId: "235654686106",
  appId: "1:235654686106:web:e62b91ba1def1c8995c623"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const App = () => {

  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false);
    },2000)
  },[]);

  if(isLoading)
  {
    return <SplashScreen></SplashScreen>;
  }
  
  return (
    <>
      <StatusBar backgroundColor="black" />
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation></Navigation>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
