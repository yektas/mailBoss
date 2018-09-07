import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RkCard, RkButton } from "react-native-ui-kitten";
import Input from "../components/common/Input";

export default class RegisterForm extends Component {
  static navigationOptions = {
    title: "Register page"
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
        console.log(this.state);
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
    return (
      <View style={styles.container}>
        <Text> Registration </Text>
        <RkCard style={styles.cardContainer}>
          <View rkContent>
            <Input
              labelText="Email"
              inputType="email"
              onChangeText={text => this.validate("email", text)}
              onFocus={this.onFocus.bind(this)}
            />
            {this.state.touched ? (
              <Text style={styles.errorStyle}>{this.state.error.email}</Text>
            ) : (
              <Text />
            )}
            <Input
              labelText="Username"
              inputType="text"
              onChangeText={text => this.validate("text", text)}
              onFocus={this.onFocus.bind(this)}
            />
            {this.state.touched ? (
              <Text style={styles.errorStyle}>{this.state.error.username}</Text>
            ) : (
              <Text />
            )}
            <Input
              labelText="Password"
              inputType="password"
              onChangeText={text => this.validate("password", text)}
              onFocus={this.onFocus.bind(this)}
            />
            {this.state.touched ? (
              <Text style={styles.errorStyle}>{this.state.error.password}</Text>
            ) : (
              <Text />
            )}
          </View>
          <View rkFooter style={styles.footerStyle}>
            <RkButton>Register</RkButton>
          </View>
        </RkCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25
  },
  cardContainer: {
    paddingHorizontal: 10
  },
  errorStyle: {
    color: "red"
  },
  footerStyle: {
    alignItems: "center",
    marginBottom: 10
  }
});
