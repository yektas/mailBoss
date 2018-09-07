import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "./common/Input";

class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Input placeholder="Email" iconName="ios-mail" />
      </View>
    );
  }
}
export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
