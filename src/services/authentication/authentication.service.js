// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// export const loginRequest = (auth, email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };


import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginRequest = async (auth, email, password) => {
  try {
    console.log("calling LoginRequest");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Store user token in AsyncStorage
    await AsyncStorage.setItem('userToken', JSON.stringify({ email, password }));
    return user;
  } catch (error) {
    throw error;
  }
};
