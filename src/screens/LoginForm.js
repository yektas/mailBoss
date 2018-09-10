import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  StatusBar
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo";
import axios from "axios";
import Images from "../config/images";
import {
  Button,
  CustomText,
  Logo,
  Input,
  Spinner,
  Notification
} from "../components/common";

export default class LoginForm extends Component {
  static navigationOptions = {
    headerTransparent: true
  };

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      touched: false,
      loading: false,
      formValid: true
    };
  }

  onFocus() {
    this.setState({ touched: true });
  }
  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  async handleLogin() {
    /*this.setState({
      loading: true
    });*/
    axios
      .post("http://192.168.1.2:8000/api/auth/login/", {
        username: this.state.username,
        password: this.state.password
      })
      .then(async response => {
        try {
          await AsyncStorage.setItem("auth_token", response.data.token);
          this.props.navigation.navigate("Users");
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        console.log(error);
      });
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

  render() {
    const showNotification = !this.state.formValid;
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
                onPress={this.handleLogin.bind(this)}
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
                  <CustomText style={{ color: "#ffff" }}>
                    Don't have an account?{" "}
                  </CustomText>
                  <CustomText style={{ color: "#27AAE0" }}>Sign Up</CustomText>
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Spinner animationType="fade" visible={this.state.loading} />
        <Button onPress={this.showactivityIndicator.bind(this)}>
          Open spinner
        </Button>
        <Notification
          showNotification={showNotification}
          handleCloseNotification={this.handleCloseNotification.bind(this)}
          type="Error"
          firstLine="Your credentials are wrong."
          secondLine="Please try again"
        />
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
    shadowOpacity: 0.3,
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
