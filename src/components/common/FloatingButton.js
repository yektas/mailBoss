import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FloatingButton = props => (
  <TouchableOpacity
    style={[styles.floatingButton, props.style]}
    onPress={props.onPress}
  >
    <Icon name={props.iconName} color={"#ffff"} size={30} />
  </TouchableOpacity>
);
export { FloatingButton };

const styles = StyleSheet.create({
  floatingButton: {
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3
  }
});
