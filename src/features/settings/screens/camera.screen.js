import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

export const CameraScreen = ({ isVisible, onClose, onTakePhoto, onChooseFromGallery }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.option} onPress={onTakePhoto}>
                        <Text style={styles.optionText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={onChooseFromGallery}>
                        <Text style={styles.optionText}>Choose Image from Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
    },
    option: {
        padding: 15,
        width: "100%",
        alignItems: "center",
    },
    optionText: {
        fontSize: 18,
        color: "black",
    },
    cancelButton: {
        marginTop: 10,
        padding: 15,
        width: "100%",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    cancelButtonText: {
        fontSize: 18,
        color: "red",
    },
});
