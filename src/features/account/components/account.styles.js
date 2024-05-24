// src/features/account/components/account.styles.js
import React from 'react';
import { ImageBackground, StyleSheet, Text, Vibration, View } from 'react-native';

export const AccountBackground = ({children}) => {
    return (
        <ImageBackground
            source={require('../../../../assets/home_bg.jpg')}
            style={styles.background}
        >
            {children}
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    background: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity:1
    },
});
