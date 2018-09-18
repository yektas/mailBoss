import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import Fonts from "../../config/fonts";

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
    fontFamily: Fonts.productSansRegular,
    color: "#3A373E"
  }
});
