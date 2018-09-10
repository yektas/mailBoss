import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header, PlusButton } from "../components/common";

class Inbox extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Mailbox" />
        <ScrollView>
          <Text> Inbox </Text>
        </ScrollView>
        <PlusButton />
      </View>
    );
  }
}
export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  }
});
