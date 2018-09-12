import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { observer } from "mobx-react/native";
import UserStore from "../store/UserStore";
import Images from "../config/images";
import urls from "../config/urls";
import {
  Button,
  CustomText,
  Logo,
  Input,
  Spinner,
  Notification
} from "../components/common";

@observer
export default class LoginForm extends Component {
  static navigationOptions = {
    headerTransparent: true
  };

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      showNotification: false,
      messageOne: "",
      messageTwo: "",
      touched: false,
      loading: false,
      formValid: true,
      loginFailed: false
    };
  }

  onFocus() {
    this.setState({ touched: true });
  }
  handleCloseNotification() {
    this.setState({ showNotification: false });
  }

  async handleLogin() {
    const { username, password } = this.state;
    this.setState({
      loading: true
    });
    if (
      (username === "" && password === "") ||
      (username === "" && password !== "") ||
      (username !== "" && password === "")
    ) {
      this.setState({
        showNotification: true,
        messageOne: "Please fill all the fields.",
        loading: false
      });
    } else {
      axios
        .post(urls.Login, {
          username,
          password
        })
        .then(async response => {
          try {
            const user = {
              userId: response.data.id,
              username: response.data.username,
              email: response.data.email,
              authToken: response.data.token
            };
            await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
            UserStore.setUser(user);
            this.props.navigation.navigate("Inbox");
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          this.setState({
            showNotification: true,
            messageOne: "Your credentials are wrong.",
            messageTwo: "Please try again.",
            loginFailed: true,
            loading: false
          });
        });
    }
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
        <Notification
          showNotification={this.state.showNotification}
          handleCloseNotification={this.handleCloseNotification.bind(this)}
          type={"Error"}
          firstLine={this.state.messageOne}
          secondLine={this.state.messageTwo}
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
