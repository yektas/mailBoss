import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Header, PlusButton } from "../components/common";

class MailBox extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Header headerText="Mailbox" />
        <ScrollView>
          <Text> My MailBox </Text>
        </ScrollView>
        <PlusButton />
      </View>
    );
  }
}
export default MailBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  }
});
