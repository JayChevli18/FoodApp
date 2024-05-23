import React from "react";
import { Text, View, ScrollView,TouchableOpacity } from "react-native";
import { CompactRestaurantInfo } from "../restaurant/compact-info-restaurant.component";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const FavouritesBar=({favourites,onNavigate})=>{

    if(!favourites.length)
    {
        return null;
    }

    return(
        <View style={{padding:10, marginLeft:10, marginRight:10,marginTop:5, justifyContent:"space-between", flex:0.5, backgroundColor:"rgba(200,200,200,0.5)", borderRadius:10}}>
            <View style={{marginLeft:10}}>
            <Text style={{fontSize:15, color:"black", fontWeight:"bold"}}>Favourites</Text>
            </View>
           
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {
                    favourites.map((restaurant)=>{
                        const key=restaurant.name;
                        return(
                            <View style={{}}  key={key}>
                                <TouchableOpacity
                                    onPress={()=>onNavigate("RestaurantDetails", {restaurant})}
                                >                               
                                    <CompactRestaurantInfo restaurant={restaurant}></CompactRestaurantInfo>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}