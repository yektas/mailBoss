import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PlusButton = () => (
  <View style={{ flex: 1 }}>
    <TouchableOpacity style={styles.plusButton}>
      <Icon name="ios-add" color={"#ffff"} size={35} />
    </TouchableOpacity>
  </View>
);
export { PlusButton };

const styles = StyleSheet.create({
  plusButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    zIndex: 1,
    borderRadius: 28,
    backgroundColor: "#ff3d00",
    elevation: 3
  }
});
