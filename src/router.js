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
import Inbox from "./screens/Inbox";
import MailDetail from "./screens/MailDetail";
import Settings from "./screens/Settings";

const AuthStackNavigator = createStackNavigator(
  {
    Register,
    Login
  },
  {
    initialRouteName: "Login"
  }
);

const MainStack = createStackNavigator({
  Users,
  MailDetail
});
const TabNavigator = createBottomTabNavigator(
  {
    Inbox: {
      screen: Inbox,
      navigationOptions: () => ({
        tabBarLabel: "INBOX",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-mail-open" color={tintColor} size={22} />
        )
      })
    },
    Users: {
      screen: MainStack,
      navigationOptions: () => ({
        tabBarLabel: "USERS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contacts" color={tintColor} size={22} />
        )
      })
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        tabBarLabel: "SETTINGS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cog" color={tintColor} size={22} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#FDD835", // active icon color
      inactiveTintColor: "#A891A6", // inactive icon color
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

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      Auth: AuthStackNavigator,
      TabNavigator
    },
    {
      initialRouteName: signedIn ? "TabNavigator" : "Auth"
    }
  );
};
