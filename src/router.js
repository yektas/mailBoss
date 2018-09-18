import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Fonts from "./config/fonts";
import Register from "./screens/RegisterForm";
import Login from "./screens/LoginForm";
import Users from "./screens/Users";
import Inbox from "./screens/Inbox";
import Reply from "./screens/Reply";
import PreviousMails from "./screens/PreviousMails";
import NewEmail from "./screens/NewEmail";
import MailsBetween from "./screens/MailsBetween";
import Settings from "./screens/Settings";
import { IconBadge } from "./components/common";

const navigationOptions = {
  headerStyle: {
    height: Platform.OS === "ios" ? 60 : 60 + 24,
    backgroundColor: "#421C6B"
  },
  headerTintColor: "#FDD835",
  headerTitleStyle: {
    fontFamily: Fonts.productSansBold,
    fontSize: 22
  }
};

const AuthStack = createStackNavigator(
  {
    Register,
    Login
  },
  {
    initialRouteName: "Login"
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings,
    AuthStack
  },
  {
    navigationOptions
  }
);

const UsersStack = createStackNavigator(
  {
    Users,
    MailsBetween,
    PreviousMails
  },
  {
    navigationOptions
  }
);

const InboxStack = createStackNavigator(
  {
    Inbox,
    Reply,
    PreviousMails,
    NewEmail
  },
  {
    initialRouteName: "Inbox",
    backBehavior: "initialRoute",
    navigationOptions
  }
);
const TabNavigator = createBottomTabNavigator(
  {
    Inbox: {
      screen: InboxStack,
      navigationOptions: () => ({
        tabBarLabel: "INBOX",
        tabBarIcon: ({ tintColor }) => <IconBadge tintColor={tintColor} />
      })
    },
    Users: {
      screen: UsersStack,
      navigationOptions: () => ({
        tabBarLabel: "USERS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contacts" color={tintColor} size={32} />
        )
      })
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: () => ({
        tabBarLabel: "SETTINGS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cog" color={tintColor} size={32} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#FDD835",
      inactiveTintColor: "#A891A6",
      labelStyle: {
        fontWeight: "600",
        marginBottom: 5
      },
      style: {
        backgroundColor: "#421C6B"
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      Auth: AuthStack,
      TabNav: TabNavigator,
      InboxStack,
      UsersStack,
      SettingsStack
    },
    {
      initialRouteName: signedIn ? "TabNav" : "Auth"
    }
  );
};
