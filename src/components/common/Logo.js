import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { CustomText } from "./CustomText";

const Logo = props => (
  <View>
    <Image
      source={props.imageSource}
      style={[styles.image, props.imageStyle]}
    />
    <CustomText style={[styles.text, props.textStyle]}>
      {props.label}
    </CustomText>
  </View>
);
export { Logo };

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: 150,
    height: 150
  },
  text: {
    alignSelf: "center",
    color: "#ffff",
    fontSize: 25
  }
});
