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
