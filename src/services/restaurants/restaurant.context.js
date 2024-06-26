import React, { useState, createContext, useEffect, useMemo, useContext } from "react";
import { LocationContext } from "../location/location.context";
import { restaurantsRequest, restaurantsTransform } from "./restaurant.service";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);



  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);
    //console.log("loc",loc);
    // setTimeout(() => {
    //   restaurantsRequest(loc)
    //     .then(restaurantsTransform)
    //     .then((results) => {
    //       //console.log(results);
    //       setIsLoading(false);
    //       setRestaurants(results);
    //     })
    //     .catch((err) => {
    //       setIsLoading(false);
    //       setError(err);
    //     });
    // }, 2000);



    restaurantsRequest(loc)
      .then(restaurantsTransform)
      .then((results)=>{
        setIsLoading(false);
//        console.log(results);
        setRestaurants(results);
      })
      .catch((err)=>{
        setIsLoading(false);
        setError(err);
      })
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);


  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};