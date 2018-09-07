import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

class Button extends Component {
  render() {
    const { onPress, buttonStyle, textStyle } = this.props;
    return (
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[textStyle]}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}
export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 170,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 6
  },
  textStyle: {
    color: "#FDD835",
    fontSize: 18
  }
});
