import React, { useContext } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";


export const FavouritesScreen = ({navigation})=>{

    const {favourites}=useContext(FavouritesContext);

    return favourites.length?(
        <SafeAreaView>
            <FlatList
                data={favourites}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity
                            onPress={()=>navigation.navigate("RestaurantDetails",{restaurant:item})}
                        >
                            <RestaurantInfoCard restaurant={item}>

                            </RestaurantInfoCard>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item)=>item.name}
            >

            </FlatList>
        </SafeAreaView>
    )
    :
    (
        <View>
            <Text style={{alignItems:"center"}}>No Favourites</Text>
        </View>
    )
}