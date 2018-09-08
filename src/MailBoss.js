import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Register from "./screens/RegisterForm";
import Login from "./screens/LoginForm";
import Users from "./screens/Users";
import MailBox from "./screens/MailBox";

const AuthStackNavigator = createStackNavigator(
  {
    Register,
    Login
  },
  {
    initialRouteName: "Login"
  }
);
const TabNavigator = createBottomTabNavigator(
  {
    Users: {
      screen: Users,
      navigationOptions: () => ({
        tabBarLabel: "USERS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contacts" color={tintColor} size={22} />
        )
      })
    },
    MailBox: {
      screen: MailBox,
      navigationOptions: () => ({
        tabBarLabel: "MAILBOX",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-mail-open" color={tintColor} size={22} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#FDD835", // active icon color
      inactiveTintColor: "#586589", // inactive icon color
      labelStyle: {
        fontWeight: "600",
        marginBottom: 5
      },
      style: {
        backgroundColor: "#421C6B" // TabBar background
      }
    }
  }
);

export default createSwitchNavigator({
  Auth: AuthStackNavigator,
  Main: TabNavigator
});
