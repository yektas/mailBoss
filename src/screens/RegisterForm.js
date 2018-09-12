import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import Images from "../config/images";
import urls from "../config/urls";
import {
  BackButton,
  Button,
  CustomText,
  Logo,
  Input,
  Notification
} from "../components/common";

export default class RegisterForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <BackButton onPress={() => navigation.goBack()} />,
    headerTransparent: true,
    headerStyle: {
      height: 100
    },
    headerTintColor: "#FDD835"
  });

  constructor() {
    super();
    this.state = {
      touched: false,
      loading: false,
      validEmail: true,
      validUsername: true,
      validPassword: true,
      formValid: true,
      registerFailed: false,
      email: "",
      username: "",
      password: "",
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

  onSubmit() {
    const { validEmail, validUsername, validPassword } = this.state;
    if (validEmail && validUsername && validPassword) {
      this.setState({ formValid: true });
      axios
        .post(urls.CreateUser, {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        })
        .then(() => {
          this.setState({
            loading: false
          });
          alert("Signup successfull");
          this.props.navigation.navigate("Login");
        })
        .catch(error => {
          console.log(error.response);
          this.setState({
            loading: false,
            registerFailed: true
          });
          alert("Signup failed");
        });
    }
  }
  handleCloseNotification() {
    this.setState({ formValid: true, registerFailed: false });
  }

  showactivityIndicator() {
    this.setState({
      loading: true
    });
    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      2500
    );
  }

  validate(type, text) {
    const usernameRegex = /^([a-zA-Z0-9_-]){3,15}$/; // Alphanumeric between 3 to 15 characters
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line no-useless-escape

    if (type === "email") {
      if (emailRegex.test(text) === false && text.trim() !== "") {
        this.setState(previousState => ({
          validEmail: false,
          error: {
            ...previousState.error,
            email: "Not a valid email"
          }
        }));
      } else {
        this.setState(previousState => ({
          validEmail: true,
          error: {
            ...previousState.error,
            email: ""
          },
          email: text
        }));
      }
    } else if (type === "text") {
      if (usernameRegex.test(text) === false && text.trim() !== "") {
        this.setState(previousState => ({
          validUsername: false,
          error: {
            ...previousState.error,
            username: "At least 3 characters and maximum 15"
          }
        }));
      } else {
        this.setState(previousState => ({
          validUsername: true,
          error: {
            ...previousState.error,
            username: ""
          },
          username: text
        }));
      }
    } else if (text.trim() === "") {
      this.setState(previousState => ({
        validPassword: false,
        error: {
          ...previousState.error,
          password: "Password is empty"
        }
      }));
    } else {
      this.setState(previousState => ({
        validPassword: true,
        error: {
          ...previousState.error,
          password: ""
        },
        password: text
      }));
    }
  }

  renderNotification() {
    const showNotification = !this.state.formValid || this.state.registerFailed;
    return (
      <Notification
        showNotification={showNotification}
        handleCloseNotification={this.handleCloseNotification.bind(this)}
        type="Error"
        firstLine="Something went wrong"
        secondLine="Please check your information"
      />
    );
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
      <LinearGradient colors={["#2A0845", "#6441A5"]} style={{ flex: 1 }}>
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
              <Button
                buttonStyle={buttonStyle}
                textStyle={buttonTextStyle}
                onPress={this.onSubmit.bind(this)}
              >
                REGISTER
              </Button>
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <CustomText style={signInTextStyle}>
                  <CustomText style={{ color: "#ffff" }}>
                    Already have an account?{" "}
                  </CustomText>
                  <CustomText style={{ color: "#27AAE0" }}>Sign In</CustomText>
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {this.renderNotification()}
      </LinearGradient>
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
    shadowOpacity: 0.3,
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
