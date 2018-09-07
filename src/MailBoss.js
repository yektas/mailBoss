import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import BackButton from "./components/common/BackButton";
import Register from "./screens/RegisterForm";
import Login from "./screens/LoginForm";

const MainStack = createStackNavigator(
  {
    Register,
    Login
  },
  {
    initialRouteName: "Register",
    navigationOptions: ({ navigation }) => ({
      headerLeft: <BackButton onPress={() => navigation.goBack()} />,
      headerTransparent: true,
      headerTintColor: "#FDD835",
      headerTitleStyle: {
        fontFamily: "Product-Sans",
        fontSize: 25
      }
    })
  }
);

export default class MailBoss extends Component {
  render() {
    return <MainStack />;
  }
}
