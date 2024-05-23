import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";
import { RestaurantDetailsScreen } from "../../features/restaurants/screens/restaurant-details.screen";
import { Text } from "react-native";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
    return (
        <RestaurantStack.Navigator screenOptions={{headerShown:false, ...TransitionPresets.ModalPresentationIOS}}>
            <RestaurantStack.Screen
                name="Restaurants"
                component={RestaurantScreen}
            />
            <RestaurantStack.Screen
                name="RestaurantDetails"
                component={RestaurantDetailsScreen}
            />
        </RestaurantStack.Navigator>
    );
};
