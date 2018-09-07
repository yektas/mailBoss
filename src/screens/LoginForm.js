import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginForm from "../components/LoginForm";

class Login extends Component {
  static navigationOptions = {
    title: "Login please"
  };

  render() {
    return (
      <View style={styles.container}>
        <LoginForm />
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
