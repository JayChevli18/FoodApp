import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ActivityIndicator, Searchbar,MD2Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RestaurantInfoCard } from '../components/restaurant-info-card.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurant.context';
import { Search } from '../components/search.component';
import { RestaurantsNavigator } from '../../../infrastructure/navigation/restaurants.navigator';

export const RestaurantScreen=({navigation})=> {

    const {isLoading,restaurants}=useContext(RestaurantsContext);
    return (
    <SafeAreaView style={{flex:1}}>
        <Search></Search>
      <View style={styles.list}>
      {
        isLoading &&(
          <View style={{position:"absolute", top:"40%",left:"50%"}}>
            <ActivityIndicator
              size={50}
              style={{marginLeft:-25}}
              animating={true}
              color={MD2Colors.black}
            >
            </ActivityIndicator>
          </View>
        )
      }

      <FlatList
      data={restaurants}
      renderItem={({item}) => (
          <TouchableOpacity onPress={()=>navigation.navigate("RestaurantDetails",{restaurant:item})}>
          <RestaurantInfoCard  restaurant={item}/>
          </TouchableOpacity>
      )}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ padding: 8 }}
    />
        {/* <RestaurantInfoCard></RestaurantInfoCard> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list:{
    flex:1,
    padding:7,
    backgroundColor:"white"
  }
});

