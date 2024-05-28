import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, ActivityIndicator, MD2Colors } from "react-native-paper";
import { AccountBackground } from "../components/account.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.accountContainer}></View>
        <Text style={styles.title}>FOOD APP</Text>
        <View style={styles.buttonContainer}>
          <TextInput
            label="Email"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            style={styles.textInput}
            onChangeText={(u) => setEmail(u)}
            value={email}
          />

          <TextInput
            label="Password"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(p) => setPassword(p)}
            style={styles.textInput}
            value={password}
          />

          {error && (
            <Text style={styles.errorText}>Error: {error}</Text>
          )}

          {!isLoading ? (
            <Button
              style={styles.loginButton}
              icon="lock-open-outline"
              mode="contained"
              buttonColor="black"
              textColor="white"
              onPress={() => onLogin(email, password)}
            >
              Login
            </Button>
          ) : (
            <ActivityIndicator
              size={50}
              style={styles.activityIndicator}
              animating={true}
              color={MD2Colors.black}
            />
          )}
        </View>
        <Button
          style={styles.backButton}
          icon="step-backward"
          mode="contained"
          buttonColor="black"
          textColor="white"
          onPress={() => navigation.navigate("Main")}
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
    alignItems: "center",
    width: "100%",
  },
  accountContainer: {
    opacity: 0.4,
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "black",
    alignItems: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 20,
    alignItems: "center",
    margin: 40,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
  },
  textInput: {
    width: 250,
    color: "black",
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    marginLeft: 2,
  },
  loginButton: {
    width: 250,
  },
  activityIndicator: {
    marginTop: 20,
  },
  backButton: {
    width: 100,
  },
});
