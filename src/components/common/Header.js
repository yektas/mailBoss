import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { CustomText } from "./CustomText";

const Header = props => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CustomText style={textStyle}>{props.headerText}</CustomText>
    </View>
  );
};
const styles = {
  viewStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#421C6B",
    height: Platform.OS === "android" ? StatusBar.currentHeight + 60 : 60,
    paddingTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "relative"
  },
  textStyle: {
    fontSize: 20,
    color: "#FDD835"
  }
};

export { Header };
