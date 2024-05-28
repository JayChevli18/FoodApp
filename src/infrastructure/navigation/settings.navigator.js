import React from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screens";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screens";
import { CameraScreen } from "../../features/settings/screens/camera.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
    return (
        <SettingsStack.Navigator
            screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerMode: "screen" }}
        >
            <SettingsStack.Screen
                options={{ header: () => null }}
                name="Settings"
                component={SettingsScreen}
            >

            </SettingsStack.Screen>
            <SettingsStack.Screen
                name="Favourites"
                component={FavouritesScreen}
            >

            </SettingsStack.Screen>


            <SettingsStack.Screen
                name="Camera"
                component={CameraScreen}
            >

            </SettingsStack.Screen>


        </SettingsStack.Navigator>
    )
}
