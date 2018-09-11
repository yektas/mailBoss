import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

class CustomText extends Component {
  render() {
    return (
      <Text
        style={[styles.textStyle, this.props.style]}
        numberOfLines={this.props.numberOfLines}
      >
        {this.props.children}
      </Text>
    );
  }
}
export { CustomText };

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "ProductSans-Regular",
    color: "#3A373E"
  }
});
