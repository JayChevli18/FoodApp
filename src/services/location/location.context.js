import React, { createContext, useContext, useEffect, useState } from "react";
import { locationRequest, locationTransform } from "./location.service";


export const LocationContext = createContext();


export const LocationContextProvider = ({ children }) => {
    const [keyword, setKeyword] = useState("San Francisco");
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword);
    };

    useEffect(() => {
        if (!keyword.length) {
            // don't do anything
            return;
        }
        locationRequest(keyword.toLowerCase())
            .then(locationTransform)
            .then((result) => {
                setIsLoading(false);
                //console.log(result);
                setLocation(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.log(err);
            });
    },[keyword]);

    return (
        <LocationContext.Provider
            value={{
                isLoading,
                error,
                location,
                search: onSearch,
                keyword
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}
