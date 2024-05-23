import React, { useState } from "react";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { ScrollView, SafeAreaView } from "react-native";
import { List } from "react-native-paper";


export const RestaurantDetailsScreen = ({ route }) => {

    const [breakfastExpanded, setBreakfastExpanded] = useState(false);
    const [lunchExpanded, setLunchExpanded] = useState(false);
    const [dinnerExpanded, setDinnerExpanded] = useState(false);
    const [drinksExpanded, setDrinksExpanded] = useState(false);

    const { restaurant } = route.params;
    return (
        <SafeAreaView style={{flex:1}}>
            <RestaurantInfoCard restaurant={restaurant}></RestaurantInfoCard>
            <ScrollView>
                <List.Accordion
                    rippleColor="black"
                    title="Breakfast"
                    titleStyle={{color: breakfastExpanded ? "blue" : "black" }}
                    left={(props) => <List.Icon {...props} color={breakfastExpanded ? "blue" : "black" } icon="bread-slice"></List.Icon>}
                    expanded={breakfastExpanded}
                    onPress={() => setBreakfastExpanded(!breakfastExpanded)}
                >
                    <List.Item title="Scrambled Eggs"></List.Item>
                    <List.Item title="Bread-Butter"></List.Item>
                </List.Accordion>

                <List.Accordion
                    rippleColor="black"
                    title="Lunch"
                    titleStyle={{color: lunchExpanded ? "blue" : "black" }}
                    left={(props) => <List.Icon {...props} color={lunchExpanded ? "blue" : "black" } icon="hamburger"></List.Icon>}
                    expanded={lunchExpanded}
                    onPress={() => setLunchExpanded(!lunchExpanded)}
                >
                    <List.Item title="Mushroom Soup"></List.Item>
                    <List.Item title="Mexican Rice"></List.Item>
                    <List.Item title="Sandwich"></List.Item>
                </List.Accordion>

                <List.Accordion
                    rippleColor="black"
                    title="Dinner"
                    titleStyle={{color: dinnerExpanded ? "blue" : "black" }}
                    left={(props) => <List.Icon {...props} color={dinnerExpanded ? "blue" : "black" } icon="food-variant" />}
                    expanded={dinnerExpanded}
                    onPress={() => setDinnerExpanded(!dinnerExpanded)}
                >
                    <List.Item title="Spaghetti Bolognese" />
                    <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
                    <List.Item title="Steak Frites" />
                </List.Accordion>

                <List.Accordion
                    rippleColor="black"
                    title="Drinks"
                    titleStyle={{color: drinksExpanded ? "blue" : "black" }}
    
                    left={(props) => <List.Icon {...props} color={drinksExpanded ? "blue" : "black" } icon="cup" />}
                    expanded={drinksExpanded}
                    onPress={() => setDrinksExpanded(!drinksExpanded)}
                >
                    <List.Item title="Coffee" />
                    <List.Item title="Tea" />
                    <List.Item title="Modelo" />
                    <List.Item title="Coke" />
                    <List.Item title="Fanta" />
                </List.Accordion>
            </ScrollView>
        </SafeAreaView>
    )
}

