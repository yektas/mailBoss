import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Header, CustomText } from "../components/common";

class MailDetail extends Component {
  static navigationOptions = {
    headerTransparent: true
  };
  render() {
    const {
      container,
      subjectContainer,
      avatarContainer,
      informationContainer,
      contentContainer,
      mailContainer,
      boldText,
      regularText,
      labelStyle,
      mailText,
      timestampStyle
    } = styles;
    const user = this.props.navigation.getParam("user");

    return (
      <View style={container}>
        <Header headerText="Mailbox" />
        <ScrollView>
          <View style={informationContainer}>
            <View style={avatarContainer}>
              <Icon name="ios-contact" color={"#3A373E"} size={80} />
            </View>
            <View style={contentContainer}>
              <CustomText style={boldText} numberOfLines={1}>
                {user.username}
              </CustomText>
              <View style={{ flexDirection: "row" }}>
                <CustomText style={labelStyle}>From: </CustomText>
                <CustomText style={regularText} numberOfLines={1}>
                  {user.last_email.from_user.email}
                </CustomText>
              </View>
              <View style={{ flexDirection: "row" }}>
                <CustomText style={labelStyle}>To: </CustomText>
                <CustomText style={regularText} numberOfLines={1}>
                  {user.last_email.to_user.email}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={subjectContainer}>
            <CustomText style={boldText}>{user.last_email.subject}</CustomText>
            <CustomText style={timestampStyle}>
              {user.last_email.timestamp}
            </CustomText>
          </View>
          <View style={mailContainer}>
            <CustomText style={mailText}>{user.last_email.content}</CustomText>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default MailDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  informationContainer: {
    flexDirection: "row",
    flex: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#999798"
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flex: 3,
    justifyContent: "center"
  },
  subjectContainer: {
    flex: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#999798",
    justifyContent: "center",
    paddingLeft: 20,
    paddingHorizontal: 20
  },
  mailContainer: {
    flex: 5,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  boldText: {
    fontWeight: "500",
    fontSize: 22
  },
  regularText: {
    fontSize: 18
  },
  labelStyle: {
    fontSize: 18,
    color: "#999798"
  },
  timestampStyle: {
    fontSize: 18,
    color: "#999798",
    paddingLeft: 5
  },
  mailText: {
    fontSize: 20
  }
});
