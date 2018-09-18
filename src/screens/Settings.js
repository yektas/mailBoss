import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Button, CustomText } from "../components/common";
import UserStore from "../store/UserStore";

class Settings extends Component {
  static navigationOptions = () => ({
    title: "Settings"
  });

  async handleLogout() {
    try {
      await AsyncStorage.removeItem("loggedInUser");
      this.props.navigation.navigate("Auth");
    } catch (error) {
      console.log(`Logout failed: Error: ${error}`);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomText>Current User : {UserStore.user.username}</CustomText>
        <Button
          onPress={this.handleLogout.bind(this)}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
        >
          Logout
        </Button>
      </View>
    );
  }
}
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff"
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: "#ff3d00"
  },
  buttonTextStyle: {
    color: "#ffff"
  }
});
