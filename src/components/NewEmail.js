import React, { Component } from "react";
import { View, TextInput, StatusBar, StyleSheet } from "react-native";
import { Header, CustomText } from "./common";

class NewEmail extends Component {
  onChangeText(text) {
    console.log(text);
  }
  render() {
    const {
      container,
      informationContainer,
      contentStyle,
      contentWrapper,
      labelStyle,
      inputStyle
    } = styles;
    return (
      <View style={container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Header headerText="Mailbox" />
        <View style={informationContainer}>
          <View
            style={{
              flex: 1,
              borderRightWidth: 0.5
            }}
          >
            <CustomText style={labelStyle}>To</CustomText>
          </View>
          <View style={{ flex: 8 }}>
            <TextInput
              style={inputStyle}
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={this.onChangeText.bind(this)}
              underlineColorAndroid={"transparent"}
              keyboardType={"email-address"}
            />
          </View>
        </View>
        <View style={contentWrapper}>
          <TextInput
            style={contentStyle}
            autoCorrect={false}
            multiline
            numberOfLines={4}
            autoCapitalize={"none"}
            onChangeText={this.onChangeText.bind(this)}
            underlineColorAndroid={"transparent"}
            placeholder={"Say something"}
          />
        </View>
      </View>
    );
  }
}
export default NewEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputStyle: {
    fontSize: 20,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: "transparent",
    borderBottomWidth: 0.5,
    borderBottomColor: "#FDD835",
    fontFamily: "Product-Sans"
  },
  labelStyle: {
    fontSize: 18,
    alignSelf: "center"
  },
  informationContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  contentWrapper: {
    flex: 6
  },
  contentStyle: {
    fontSize: 20,
    paddingHorizontal: 20
  }
});
