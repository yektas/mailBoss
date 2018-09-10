import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Header, CustomText } from "../components/common";

class MailDetail extends Component {
  onChangeText(text) {
    console.log(text);
  }
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
      timestamp
    } = styles;
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
                Sercan Yektaş
              </CustomText>
              <View style={{ flexDirection: "row" }}>
                <CustomText style={labelStyle}>From: </CustomText>
                <CustomText style={regularText} numberOfLines={1}>
                  syektas@gmail.com
                </CustomText>
              </View>
              <View style={{ flexDirection: "row" }}>
                <CustomText style={labelStyle}>To: </CustomText>
                <CustomText style={regularText} numberOfLines={1}>
                  sercanyektas@icloud.com
                </CustomText>
              </View>
            </View>
          </View>
          <View style={subjectContainer}>
            <CustomText style={boldText}>About that task earlier</CustomText>
            <CustomText style={timestamp}>
              Date & Time: June 12th, 2018
            </CustomText>
          </View>
          <View style={mailContainer}>
            <CustomText style={mailText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              bibendum viverra congue. Fusce mauris ex, bibendum vel augue
              vitae, vestibulum pellentesque risus. Nunc massa est, viverra sit
              amet orci a, congue dapibus dui. Proin sed magna felis. Donec
              consectetur urna pharetra sollicitudin venenatis. In nibh libero,
              dictum id lobortis eu, porta eu lorem. Nullam gravida est
              ultricies elit malesuada vehicula. Quisque malesuada venenatis
              tortor, et fringilla mauris pulvinar sed. Praesent et interdum
              risus. Vestibulum consectetur porta pellentes
            </CustomText>
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
  timestamp: {
    fontSize: 18,
    color: "#999798",
    paddingLeft: 5
  },
  mailText: {
    fontSize: 20
  }
});
