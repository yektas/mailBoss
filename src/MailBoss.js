import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Register from "./screens/RegisterForm";
import Login from "./screens/LoginForm";

const MainStack = createStackNavigator(
  {
    Register,
    Login
  },
  {
    initialRouteName: "Register"
  }
);

export default class MailBoss extends Component {
  render() {
    return <MainStack />;
  }
}
