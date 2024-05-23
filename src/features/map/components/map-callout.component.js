import React from "react";
import { CompactRestaurantInfo } from "../../../components/restaurant/compact-info-restaurant.component";

export const MapCallout=({restaurant})=>{
    return(
    <CompactRestaurantInfo restaurant={restaurant}></CompactRestaurantInfo>
    )
}