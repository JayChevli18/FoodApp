import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { AccountBackground } from "../components/account.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { ActivityIndicator } from "react-native-paper";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { onRegister,isLoading, error } = useContext(AuthenticationContext);
  console.log(isLoading);
  return (
    <AccountBackground>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.accountContainer}></View>
        <Text style={{ fontSize: 30, color: "black", alignItems: "center", fontWeight: "bold" }}>FOOD APP</Text>
        <View style={styles.buttonContainer}>
          <TextInput
            label="Email"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            style={{ width: 250, color: "black" }}
            onChangeText={(u) => setEmail(u)}
            value={email}
          />
            <TextInput
              label="Password"
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(p) => setPassword(p)}
              style={{ width: 250, color: "black", marginTop: 20 }}
              value={password}
            />

          <View style={{ marginBottom: 50 }}>
            <TextInput
              label="Confirm Password"
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(p) => setRepeatPassword(p)}
              style={{ width: 250, color: "black", marginTop: 20, marginBottom: 20 }}
              value={repeatPassword}
            />
            {error && (
              <View>
                <Text style={{ color: "red", marginLeft: 2 }}>Error: {error}</Text>
              </View>
            )}
          </View>
          {
            console.log("ins", isLoading)
          }
          {
            !isLoading ? (
              <Button
              style={[styles.button, { width: 250 }]}
              icon="email-outline"
              mode="contained"
              buttonColor="black"
              textColor="white"
              onPress={() => onRegister(email, password, repeatPassword)}
            >
              Register
            </Button>  
            ) 
            : 
            (
              <ActivityIndicator animating={true} color="black" size={50}/>
            )
          }
        </View>
        <Button
          style={[styles.button, { width: 100 }]}
          icon="step-backward"
          mode="contained"
          buttonColor="black"
          textColor="white"
          onPress={() => navigation.goBack()}
        >
          Back
        </Button>
      </ScrollView>
    </AccountBackground>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems:"center",
    width:"100%",
    flex:1,
//    opacity:1
  },
  accountContainer: {
    opacity: 0.4,
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 20,
    alignItems: "center",
    margin: 40,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
  },
  button: { width: 150, height: 50, justifyContent: "center" },
});
