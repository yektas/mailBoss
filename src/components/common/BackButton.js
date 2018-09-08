import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const BackButton = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Icon name="ios-arrow-back" size={30} style={styles.iconStyle} />
  </TouchableOpacity>
);
export { BackButton };

const styles = StyleSheet.create({
  iconStyle: {
    color: "#FDD835",
    paddingLeft: 15,
    fontSize: 40
  }
});
