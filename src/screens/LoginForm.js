import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo";
import Images from "../config/images";
import {
  BackButton,
  Button,
  CustomText,
  Logo,
  Input
} from "../components/common";

export default class LoginForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <BackButton onPress={() => navigation.goBack()} />,
    headerTransparent: true,
    headerTintColor: "#FDD835"
  });

  state = {
    username: "",
    password: "",
    touched: false
  };

  onFocus() {
    this.setState({ touched: true });
  }

  render() {
    const {
      container,
      cardContainer,
      footerStyle,
      buttonTextStyle,
      buttonStyle,
      signUpTextStyle
    } = styles;
    return (
      <LinearGradient colors={["#2A0845", "#6441A5"]} style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <KeyboardAwareScrollView
          style={container}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Logo imageSource={Images.mailBox} label="MailBoss" />
          <View style={cardContainer}>
            <Input
              labelText="Username"
              inputType="text"
              onChangeText={text => this.setState({ username: text })}
              onFocus={this.onFocus.bind(this)}
            />
            <Input
              labelText="Password"
              inputType="password"
              onChangeText={text => this.setState({ password: text })}
              onFocus={this.onFocus.bind(this)}
            />

            <View style={footerStyle}>
              <Button
                onPress={() => this.props.navigation.navigate("Users")}
                buttonStyle={buttonStyle}
                textStyle={buttonTextStyle}
              >
                LOGIN
              </Button>
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <CustomText style={signUpTextStyle}>
                  <CustomText>Don't have an account? </CustomText>
                  <CustomText style={{ color: "#27AAE0" }}>Sign Up</CustomText>
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    marginTop: 25
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  cardContainer: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    padding: 15,
    justifyContent: "center"
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: "#ff3d00"
  },
  buttonTextStyle: {
    color: "#ffff"
  },
  signUpTextStyle: {
    color: "#ffff",
    marginTop: 10,
    fontSize: 18
  },
  footerStyle: {
    alignItems: "center",
    marginBottom: 10
  }
});
