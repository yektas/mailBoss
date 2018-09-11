import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Header, Button } from "../components/common";

class Settings extends Component {
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
        <Header headerText="Settings" />
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
    flex: 1
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: "#ff3d00"
  },
  buttonTextStyle: {
    color: "#ffff"
  }
});
