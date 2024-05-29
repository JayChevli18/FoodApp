//import { mocks,mockImages } from "./mock/index";
import camelize from "camelize";

export const restaurantsRequest = (location) => {
//  console.log("locaton",location);
//   return new Promise((resolve, reject) => {
//     const mock = mocks[location];
// //    console.log(mock);
//     if (!mock) {
//       reject("not found");
//     }
//     resolve(mock);
//   });


    return fetch(
      `http://192.168.29.214:5001/foodapp-424112/us-central1/placesNearby?location=${location}`
    ).then((res)=>{
      return res.json();
    })

};

export const restaurantsTransform = ({ results }) => {
  //console.log("called");
  const mappedResults = results.map((restaurant) => {
  //  console.log(mappedResults);
    // restaurant.photos=restaurant.photos.map((p)=>{
    //     let img=Math.floor(Math.random() * (mockImages.length-1));
    //     let newimg=mockImages[img];
    //     const newimg2 = newimg ? newimg : "img----not exist";
    //     return newimg2;
    // });
    return {
      ...restaurant,
      address:restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};