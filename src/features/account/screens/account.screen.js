import React from "react";
import { AccountBackground } from "../components/account.styles";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import LottieView from "lottie-react-native";

export const AccountScreen = ({ children, navigation }) => {
    return (
        <AccountBackground>            
            <View style={[styles.accountContainer]}>
            <View style={{ width: "100%", height: "50%", bottom:200, padding: 30, marginBottom:20 }}>
                <LottieView
                    source={require("../../../../assets/watermelon.json")}
                    autoPlay
                    loop
                    resizeMode="cover"
                    style={{ flex: 1 }}
                    key="animation"
                >
                    {console.log("called")}
                </LottieView>
            </View>
            </View>
            <Text style={{ fontSize: 30, color: "black", alignItems: "center", fontWeight: "bold", marginBottom:50, marginTop:100 }}>FOOD APP</Text>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    icon="lock-open-outline"
                    mode="contained"
                    buttonColor="black"
                    textColor="white"
                    onPress={() => navigation.navigate("Login")}
                >
                    Login
                </Button>
                <Button
                    style={[styles.button, { marginTop: 20 }]}
                    icon="email-outline"
                    mode="contained"
                    buttonColor="black"
                    textColor="white"
                    onPress={() => navigation.navigate("Register")}
                >
                    Register
                </Button>
            </View>
        </AccountBackground>
    )
}

const styles = StyleSheet.create({
    accountContainer: {
        opacity: 0.4,
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        flex:1,
        height: "100%",
        justifyContent: "center"
    },
    buttonContainer: {
        padding: 20,
        alignItems: "center",
        marginBottom: 120,
        backgroundColor: "rgba(255,255,255,0.8)",
        justifyContent: "center"
    },
    button: { width: 150, height: 50, justifyContent: "center" }
})