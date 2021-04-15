import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Camera as ExpoCamera } from "expo-camera";
import Constants from "expo-constants";

const Camera = ({ onCloseCamera, onTakePicture }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [camera, setCamera] = useState();

  useEffect(() => {
    async () => {
      const { status } = await ExpoCamera.requestPermissionAsync();
      setHasPermission(status === "granted");
    };
  }, []);

  const onFlipPress = () => {
    setType(
      type === ExpoCamera.Constants.Type.back
        ? ExpoCamera.Constants.Type.front
        : ExpoCamera.Constants.Type.back
    );
  };

  const onTakePicturePress = async () => {
    try {
      const { uri } = await camera.takePictureAsync({
        quality: 0.5,
      });
      onTakePicture(uri);
    } catch {
      console.log(error);
      Alert.alert("Error", "houve algum erro!");
    }
  };
  return (
    <ExpoCamera style={{ flex: 1 }} type={type} ref={(ref) => setCamera(ref)}>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onFlipPress}>
          <Text style={styles.flipText}>Flip</Text>
        </TouchableOpacity>

        <Icon
          name="close"
          size={50}
          color={"#fff"}
          onPress={onCloseCamera}
        ></Icon>
      </View>
      <TouchableOpacity
        onPress={onTakePicturePress}
        style={styles.takePictureButton}
      >
        <Icon name="aperture-outline" size={50} color={"#fff"}></Icon>
      </TouchableOpacity>
    </ExpoCamera>
  );
};
const styles = StyleSheet.create({
  actionButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    paddingTop: Constants.statusBarHeight,
  },
  flipText: {
    fontSize: 18,
    color: "#fff",
  },
  takePictureButton: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 5,
  },
});

export default Camera;
