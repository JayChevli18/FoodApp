import React,{useState,useContext, useEffect} from "react";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";
import { View,Text,StyleSheet } from "react-native";


export const Search=({isFavouritesToggled, onFavouritesToggle})=>{
    const {keyword,search}=useContext(LocationContext);
    const [searchKeyword,setSearchKeyword]=useState(keyword);

    useEffect(()=>{
        setSearchKeyword(keyword);
    },[keyword]);

    return(
        <View style={styles.search}>
        <Searchbar
            icon={isFavouritesToggled ? "heart" : "heart-outline"}
            onIconPress={onFavouritesToggle}
            style={{backgroundColor:"white"}}
            iconColor='black'
            placeholder="Search for a location"
            value={searchKeyword}
            onSubmitEditing={() => {
                search(searchKeyword);
              }}
            onChangeText={(text) => {
                setSearchKeyword(text);
              }}
        >
        </Searchbar>
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
      padding:10,
      backgroundColor:"black",
    },
});  