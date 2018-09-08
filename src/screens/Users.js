import React, { Component } from "react";
import { View, Text, ListView, Alert, StyleSheet } from "react-native";
import axios from "axios";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    axios
      .get("https://192.168.1.2:8000/api/v1/users")
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Users</Text>
      </View>
    );
  }
}
export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
