// import React, { createContext, useState, useEffect, useContext } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthenticationContext } from "../authentication/authentication.context";



// export const FavouritesContext = createContext();

// export const FavouritesContextProvider = ({ children }) => {

//   const {user}=useContext(AuthenticationContext);


//   const [favourites, setFavourites] = useState([]);

//   const saveFavourites = async (value,uid) => {
//     try {
//       const jsonValue = JSON.stringify(value);  
//       await AsyncStorage.setItem(`favourites-${uid}`, jsonValue);
//     } catch (e) {
//       console.log("error storing", e);
//     }
//   };

//   const loadFavourites = async (uid) => {
//     try {
//       const value = await AsyncStorage.getItem(`favourites-${uid}`);
//       if (value !== null) {
//         setFavourites(JSON.parse(value));
//       }
//     } catch (e) {
//       console.log("error loading", e);
//     }
//   };

//   const add = (restaurant) => {
//     setFavourites([...favourites, restaurant]);
//   };

//   const remove = (restaurant) => {
//     const newFavourites = favourites.filter(
//       (x) => x.placeId !== restaurant.placeId
//     );

//     setFavourites(newFavourites);
//   };

//   useEffect(() => {
//     if(user && user.uid){
//     loadFavourites(user.uid);}
//   }, [user]);

//   useEffect(() => {
//     if(user && user.uid && favourites.length){
//     saveFavourites(favourites,user.uid);}
//   }, [favourites,user]);

//   return (
//     <FavouritesContext.Provider
//       value={{
//         favourites,
//         addToFavourites: add,
//         removeFromFavourites: remove,
//       }}
//     >
//       {children}
//     </FavouritesContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);  
  const [favourites, setFavourites] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // Track user login status
//  console.log("Called 1st");
  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`favourites-${uid}`, jsonValue);
  //    console.log("Favorites saved:", value);
    } catch (error) {
      console.error("Error storing favourites:", error);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      //console.log("Called 2d");
      const value = await AsyncStorage.getItem(`favourites-${uid}`);
      if (value !== null) {
    //    console.log("Favorites loaded:", JSON.parse(value));
        setFavourites(JSON.parse(value));
      } else {
        console.log("No favorites found for user:", uid);
      }
    } catch (error) {
      console.error("Error loading favourites:", error);
    }
  };

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };

  useEffect(() => {
    // console.log(user);
    // console.log(user.uid);
    // console.log("called 3", user.uid);
    if (user && user.uid) {
    //  console.log("call 4");
      //console.log("User logged in:", user.uid);
      loadFavourites(user.uid);
//      console.log("call 5");
      setLoggedIn(true); // Set login status to true upon user login
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && loggedIn) {
  //    console.log("Saving favourites for user:", user.uid);
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user, loggedIn]); // Include loggedIn as dependency

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
