import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Images from "../config/images";
import Input from "../components/Input";
import CustomText from "../components/common/CustomText";
import Button from "../components/common/Button";
import Logo from "../components/common/Logo";

export default class RegisterForm extends Component {
  static navigationOptions = {
    headerMode: "none"
  };

  constructor() {
    super();
    this.state = {
      touched: false,
      emailValidated: true,
      usernameValidated: true,
      passwordValidated: true,
      error: {
        email: "",
        username: "",
        password: ""
      }
    };
  }

  onFocus() {
    this.setState({ touched: true });
  }

  validate(type, text) {
    const usernameRegex = /^([a-zA-Z0-9_-]){3,15}$/; // Alphanumeric between 3 to 15 characters
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line no-useless-escape

    if (type === "email") {
      if (emailRegex.test(text) === false && text.trim() !== "") {
        this.setState(previousState => ({
          emailValidated: false,
          error: {
            ...previousState.error,
            email: "Not a valid email"
          }
        }));
      } else {
        this.setState(previousState => ({
          error: {
            ...previousState.error,
            email: ""
          }
        }));
      }
    } else if (type === "text") {
      if (usernameRegex.test(text) === false && text.trim() !== "") {
        this.setState(previousState => ({
          error: {
            ...previousState.error,
            username: "At least 3 characters and maximum 15"
          }
        }));
      } else {
        this.setState(previousState => ({
          error: {
            ...previousState.error,
            username: ""
          }
        }));
      }
    } else if (text.trim() === "") {
      this.setState(previousState => ({
        error: {
          ...previousState.error,
          password: "Password is empty"
        }
      }));
    } else {
      this.setState(previousState => ({
        error: {
          ...previousState.error,
          password: ""
        }
      }));
    }
  }

  render() {
    const {
      container,
      cardContainer,
      errorStyle,
      footerStyle,
      buttonTextStyle,
      buttonStyle,
      signInTextStyle
    } = styles;
    return (
      <ImageBackground
        source={Images.background}
        imageStyle={{
          resizeMode: "stretch"
        }}
        style={styles.bgImage}
      >
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
          <Logo
            imageSource={Images.newAccount}
            imageStyle={{ marginBottom: 10, width: 70, height: 70 }}
            label="Create new account"
          />
          <View style={cardContainer}>
            <Input
              labelText="Email"
              inputType="email"
              onChangeText={text => this.validate("email", text)}
              onFocus={this.onFocus.bind(this)}
            />
            {this.state.touched ? (
              <CustomText style={errorStyle}>
                {this.state.error.email}
              </CustomText>
            ) : (
              <CustomText />
            )}
            <Input
              labelText="Username"
              inputType="text"
              onChangeText={text => this.validate("text", text)}
              onFocus={this.onFocus.bind(this)}
            />
            {this.state.touched ? (
              <CustomText style={errorStyle}>
                {this.state.error.username}
              </CustomText>
            ) : (
              <CustomText />
            )}
            <Input
              labelText="Password"
              inputType="password"
              onChangeText={text => this.validate("password", text)}
              onFocus={this.onFocus.bind(this)}
            />
            {this.state.touched ? (
              <CustomText style={errorStyle}>
                {this.state.error.password}
              </CustomText>
            ) : (
              <CustomText />
            )}

            <View style={footerStyle}>
              <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
                REGISTER
              </Button>
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <CustomText style={signInTextStyle}>
                  <CustomText>Already have an account? </CustomText>
                  <CustomText style={{ color: "#27AAE0" }}>Sign In</CustomText>
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    marginTop: 50
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
    padding: 15
  },
  errorStyle: {
    color: "#f44336"
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: "#FF3D00"
  },
  buttonTextStyle: {
    color: "#ffff"
  },
  signInTextStyle: {
    color: "#ffff",
    marginTop: 10,
    fontSize: 18
  },
  footerStyle: {
    alignItems: "center",
    marginBottom: 10
  },
  accountIconStyle: {
    alignSelf: "center",
    width: 100,
    height: 100
  }
});
