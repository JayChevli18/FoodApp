/*

import React, { useState, createContext, useRef, Children } from "react";
import { signOut, createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from "firebase/auth";
import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const auth=useRef(getAuth()).current;

    onAuthStateChanged(auth, (usr) => {
        if (usr) {
          setUser(usr);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });

    const onLogin = (email, password) => {
        console.log(email,password);
        setIsLoading(true);
        loginRequest(auth, email, password)
            .then((u) => {
                console.log(u);
                setUser(u);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.code === "auth/invalid-credential" || error.code === "auth/invalid-email") {
                    setError("Invalid email or password");
                } else {
                    setError(error.message);
                }
            });
    }

    const onRegister=(email,password,repeatedPassword)=>{
        setIsLoading(true);
        if(password!==repeatedPassword)
        {
            setError("Error: Password do not match");
            return;
        }
        createUserWithEmailAndPassword(auth,email,password)
            .then((u)=>{
                setUser(u);
                setIsLoading(false);
            })
            .catch((e)=>{
                setIsLoading(false);
                setError(e.message);
            })
    }

    const onLogout=()=>{
        signOut(auth).then(()=>{
            setUser(null);
            setError(null);
        })
    }

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated:!!user,
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}






*/
























//This code is for permanent logged IN, but favourites is not working when trying to implement it.


import React, { useState, createContext, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const auth = getAuth();

    const checkLoggedInStatus = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                const { email, password } = JSON.parse(userToken);
                const usr = await loginRequest(auth, email, password);
                setUser(usr);
//                console.log("LoginPage: ",usr);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error checking login status:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {    
        checkLoggedInStatus();
    }, []);

    const onLogin = async (email, password) => {
        setIsLoading(true);
        try {
            const usr = await signInWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('userToken', JSON.stringify({ email, password }));
            setUser(usr);
  //          console.log("Calling onLogin: ",usr);
            checkLoggedInStatus();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.code === "auth/invalid-credential" || error.code === "auth/invalid-email") {
                setError("Invalid email or password");
            } else {
                setError(error.message);
            }
        }
    };

    const onRegister = async (email, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            setIsLoading(false);
            return;
        }
        try {
            const usr = await createUserWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('userToken', JSON.stringify({ email, password }));
            setUser(usr);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};






