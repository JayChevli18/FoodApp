import camelize from "camelize";
//import { locations } from "./location.mock";


// export const locationRequest=(searchTerm)=>{
//     return new Promise((resolve,reject)=>{
//         const locationMock=locations[searchTerm];
//         if(!locationMock)
//             reject("Not Found");
//         resolve(locationMock);
//     });
// };

export const locationRequest=(searchTerm)=>{
    return fetch(
        `http://192.168.29.214:5001/foodapp-424112/us-central1/geocode?city=${searchTerm}`
    ).then((res)=>{
        return res.json();
    });
};

export const locationTransform=(result)=>{
    console.log(result);
    const formattedResponse=camelize(result);
    const {geometry={}}=formattedResponse.results[0];
    const {lat,lng}=geometry.location;
    return {lat,lng,viewport:geometry.viewport};
}

