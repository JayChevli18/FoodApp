import React,{useContext} from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity, View } from "react-native";
import { FavouritesContext } from "../../services/favourites/favourites.context";


export const Favourite=({restaurant})=>{

    const {favourites,addToFavourites,removeFromFavourites}=useContext(FavouritesContext);

    const isFavourite = favourites.find((r) => r.placeId === restaurant.placeId);

    return(
        <View>
        <TouchableOpacity 
            style={{position:"absolute", top:30,right:30,zIndex:10}}
            onPress={()=>!isFavourite ? addToFavourites(restaurant) : removeFromFavourites(restaurant)}
        >
            <AntDesign 
                name={isFavourite? "heart" : "hearto"}
                size={25}
                color={isFavourite ? "red" : "white"}
            >
            </AntDesign>
        </TouchableOpacity>
        </View>
    )
}