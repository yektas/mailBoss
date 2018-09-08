import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/common";

class Content extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Content" />
        <Text>Content</Text>
      </View>
    );
  }
}
export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
