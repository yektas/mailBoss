import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RkButton } from "react-native-ui-kitten";
import Input from "../components/Input";

export default class LoginForm extends Component {
  render() {
    const { container, headerStyle, cardContainer, footerStyle } = styles;
    return (
      <KeyboardAwareScrollView style={container}>
        <Text style={headerStyle}> Login </Text>
        <View style={cardContainer}>
          <Input
            labelText="Username"
            inputType="text"
            onChangeText={text => this.validate("text", text)}
          />
          <Input
            labelText="Password"
            inputType="password"
            onChangeText={text => this.validate("password", text)}
          />
        </View>
        <View style={footerStyle}>
          <RkButton>Login</RkButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#5263dd",
    paddingTop: 30
  },
  headerStyle: {
    fontSize: 30,
    marginBottom: 20,
    alignSelf: "center",
    color: "#f5d856",
    fontFamily: "Product-Sans"
  },
  cardContainer: {
    backgroundColor: "#f5d856",
    elevation: 5,
    padding: 15
  },
  inputErrorStyle: {
    borderWidth: 2,
    borderColor: "#f44336"
  },
  labelErrorStyle: {
    color: "#f44336",
    borderColor: "#f44336"
  },
  errorStyle: {
    color: "#f44336",
    fontFamily: "Product-Sans"
  },
  footerStyle: {
    alignItems: "center",
    marginBottom: 10
  }
});
