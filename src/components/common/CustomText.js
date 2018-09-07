import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

class CustomText extends Component {
  render() {
    return (
      <Text style={[styles.textStyle, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
export default CustomText;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Product-Sans"
  }
});
