import React from "react";
import { Text, StyleSheet, Platform, View, Image } from "react-native";
import { WebView } from "react-native-webview";

export const CompactRestaurantInfo = ({ restaurant }) => {
  const isAndroid = Platform.OS === "android";
  const ImageComponent = isAndroid ? WebView : Image;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ImageComponent
          style={styles.image}
          source={{ uri: restaurant.photos[0] }}
        />
      </View>

        <Text style={styles.text} numberOfLines={3}>
          {restaurant.name}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
      // Added margin to container for spacing around the item
    marginRight:5,
    marginLeft:5,
    marginTop:10,
  },
  item: {
    marginRight:5,
    marginLeft:5,

    padding: 10,
    maxWidth: 160,
    maxHeight:150,
    alignItems: "center",
    backgroundColor: "white",  // Added background color to the item for better visualization
    borderRadius: 10,  // Added border radius to match the image's rounded corners
//    opacity:0.6
  },
  image: {
    borderRadius: 10,
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    color:"black",
    marginTop: 5,
  },
});

