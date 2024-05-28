import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, SafeAreaView, Text, View, StyleSheet, Image, Alert, Platform } from "react-native";
import { List } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import imgPlaceHolder from "../../../../assets/user_boy.png";
import Entypo from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-crop-picker";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { CameraScreen } from "./camera.screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export const SettingsScreen = ({ navigation }) => {
    const { onLogout, user } = useContext(AuthenticationContext);
    const [profile, setProfile] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const getProfilePic = async (currentUser) => {
        try {
            const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
            setProfile(photoUri);
        } catch (error) {
            console.error("Error loading profile picture:", error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getProfilePic(user);
        }, [user])
    );

    const checkPermissions = async (permission) => {
        try {
            const result = await request(permission);
            return result === RESULTS.GRANTED;
        } catch (error) {
            console.error("Permission error: ", error);
            return false;
        }
    };

    const imagePick = async () => {
        const hasPermission = await checkPermissions(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        );
        if (!hasPermission) {
            Alert.alert("Permission Denied", "Storage permission is required to select an image.");
            return;
        }

        try {
            const image = await ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: false
            });
            console.log(image);
            await AsyncStorage.setItem(`${user.uid}-photo`, image.path);
            setProfile(image.path);
        } catch (error) {
            console.error("Image pick error: ", error);
            Alert.alert("Error", "An error occurred while picking the image.");
        } finally {
            setModalVisible(false);
        }
    };

    const openCamera = async () => {
        const hasPermission = await checkPermissions(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        );
        if (!hasPermission) {
            Alert.alert("Permission Denied", "Camera permission is required to take a picture.");
            return;
        }

        try {
            const image = await ImagePicker.openCamera({
                width: 400,
                height: 400,
                cropping: true
            });
            console.log(image);
            await AsyncStorage.setItem(`${user.uid}-photo`, image.path);
            setProfile(image.path);
        } catch (error) {
            console.error("Camera error: ", error);
            Alert.alert("Camera Error", "An error occurred while accessing the camera.");
        } finally {
            setModalVisible(false);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Image style={styles.image} source={profile ? { uri: profile } : imgPlaceHolder} />
                <TouchableOpacity onPress={toggleModal} style={styles.cameraIcon}>
                    <Entypo name="camera" size={20} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, color: "black", marginBottom: 40 }}>{user.email}</Text>
            </View>

            <List.Section>
                <List.Item
                    style={{ padding: 16 }}
                    title="Favourites"
                    description="View your favourites"
                    left={(props) => <List.Icon {...props} color="black" icon="heart" />}
                    onPress={() => navigation.navigate("Favourites")}
                />
                <List.Item
                    style={{ padding: 16 }}
                    title="Logout"
                    description="Logout from the application"
                    left={(props) => <List.Icon {...props} color="black" icon="door" />}
                    onPress={onLogout}
                />
            </List.Section>

            {isModalVisible && <CameraScreen
                isVisible={isModalVisible}
                onClose={toggleModal}
                onTakePhoto={openCamera}
                onChooseFromGallery={imagePick}
            />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {},
    textContainer: {
        alignItems: 'center',
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderColor: "black",
        borderWidth: 3,
        marginTop: 50
    },
    cameraIcon: {
        top: -25,
        left: 30,
        backgroundColor: "black",
        borderRadius: 20,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    userInfo: {
        flex: 1,
    },
    bio: {
        borderRadius: 10,
        padding: 16,
        margin: 16
    }
});
