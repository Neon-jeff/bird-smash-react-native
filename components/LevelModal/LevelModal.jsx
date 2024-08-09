import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const LevelModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={80} style={styles.centeredView}>
        <Pressable style={styles.background} onPress={onClose} />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Level Completed!</Text>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../assets/images/Game/bird.png")}
              style={styles.image}
            />
          </View>
          <Pressable style={styles.playButton} onPress={onClose}>
            <Text style={styles.playText}>PLAY</Text>
          </Pressable>
          <Pressable style={styles.playButton} onPress={onClose}>
            <Text style={styles.playText}>Play</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalView: {
    width: width * 0.8, 
    height: height * 0.5, 
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
  playButton: {
    backgroundColor: "#FFCC00",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  playText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF0000",
    borderRadius: 50,
    padding: 5,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LevelModal;
