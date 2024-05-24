import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, ActivityIndicator, MD2Colors } from "react-native-paper";
import { AccountBackground } from "../components/account.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, isLoading ,error } = useContext(AuthenticationContext);

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

          <View style={{ marginBottom: 50 }}>
            <TextInput
              label="Password"
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(p) => setPassword(p)}
              style={{ width: 250, color: "black", marginTop: 20, marginBottom: 20 }}
              value={password}
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
              icon="lock-open-outline"
              mode="contained"
              buttonColor="black"
              textColor="white"
              onPress={() => onLogin(email, password)}
            >
              Login
            </Button>
  
            ):(

              <View style={{position:"absolute", top:"40%",left:"50%"}}>
            <ActivityIndicator
              size={50}
              style={{marginLeft:-25}}
              animating={true}
              color={MD2Colors.black}
            >
            </ActivityIndicator>
            </View>
            )
          }

        </View>
        <Button
          style={[styles.button, { width: 100 }]}
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
