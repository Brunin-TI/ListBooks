import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";

const Photo = ({ photo, onDeletePhoto, onClosePicture }) => {
  return (
    <ImageBackground source={{ uri: photo }} style={styles.imagePreview}>
      <View style={styles.actionButtons}>
        <Icon
          name="trash-outline"
          size={40}
          color={"#fff"}
          onPress={() => {
            onDeletePhoto(null);
          }}
        />
        <Icon
          name="checkmark-outline"
          size={40}
          color={"#fff"}
          onPress={onClosePicture}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  actionButtons: {
    flexDirection: "row",
    marginRight: 5,
    marginLeft: 5,
    justifyContent: "space-between",
    paddingTop: Constants.statusBarHeight,
  },
});

export default Photo;
