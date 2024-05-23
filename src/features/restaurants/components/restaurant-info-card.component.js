import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Favourite } from "../../../components/favourites/favourites.component";

const RestaurantCardStyled = styled(Card)`
    background-color:white;
    marginBottom:15px;
`;


const Title = styled(Text)`
    color:${(props) => props.theme.colors.ui.primary};
    marginLeft:18px;
    fontSize:18px;
`;

export const RestaurantInfoCard = ({ restaurant = {} }) => {

    const {
        name = "Some Restaurant",
        icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        photos = [
            "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
            "https://as1.ftcdn.net/v2/jpg/02/52/38/80/1000_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg",
        ],
        address = "4369 piplod surat",
        isOpenNow = true,
        rating = 4,
        isClosedTemporarily = true,
        placeId,
    } = restaurant;


    const ratingarr = Array.from(new Array(Math.floor(rating)));

    return (
        <RestaurantCardStyled elevation={5} >
            <View>
            <Favourite restaurant={restaurant}></Favourite>
            <Card.Cover key={name} style={styles.cover} source={{ uri: photos[0] }} />
            </View>
            <Title>{name}</Title>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "row", marginLeft: 16, paddingTop: 5, paddingBottom: 4, alignItems: "center" }}>
                    {
                        ratingarr.map((_,i) => (
                            <SvgXml key={`star-${placeId}-${i}`} xml={star} width={20} height={20}></SvgXml>
                        ))
                    }
                </View>
                <View style={{ justifyContent: "flex-end", flexDirection: "row", paddingBottom: 8,paddingTop:4, flex: 0.9 }}>
                
                    {isClosedTemporarily && (<Text style={{ color: "red", fontSize: 13 }}>CLOSED TEMPORARY</Text>)}

                    <View style={{ paddingLeft: 10 }}>
                        {isOpenNow && <SvgXml xml={open} width={18} height={18} />}
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <Image style={{ width: 18, height: 18 }} source={{ uri: icon }} />
                    </View>
                </View>
            </View>
            <Text style={styles.title}>{address}</Text>
        </RestaurantCardStyled>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
    },
    cover: {
        padding: 15,
        backgroundColor: "white",
    },
    title: {
        padding: 7,
        marginLeft: 12,
        fontSize: 14,
        fontWeight: "bold",
        color: "black"
    }
})
