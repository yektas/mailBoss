import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = props => (
  <View style={[styles.container, props.style]}>{props.children}</View>
);
export { Card };

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  }
});
