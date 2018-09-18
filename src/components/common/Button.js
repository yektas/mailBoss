import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

class Button extends Component {
  render() {
    const { onPress, buttonStyle, textStyle } = this.props;
    return (
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}
export { Button };

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 280,
    height: 45,
    borderWidth: 0
  },
  text: {
    fontSize: 18
  }
});
