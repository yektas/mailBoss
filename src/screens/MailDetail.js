import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import format from "date-fns/format";
import { observer } from "mobx-react/native";
import Fonts from "../config/fonts";
import { CustomText, FloatingButton } from "../components/common";
import UserStore from "../store/UserStore";

@observer
class MailDetail extends Component {
  static navigationOptions = () => ({
    title: "Mail Details"
  });

  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.navigation.getParam("mail")
    };
  }

  onReplyPress(mail) {
    this.props.navigation.navigate("Reply", { mail });
  }
  renderTimestamp(timestamp) {
    return format(new Date(timestamp), "D MMMM YYYY HH:mm");
  }
  render() {
    console.log(this.state.replyVisible);
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

    const data = this.state.mail;
    return (
      <View style={container}>
        <ScrollView>
          <View style={informationContainer}>
            <View style={avatarContainer}>
              <Icon name="ios-contact" color={"#3A373E"} size={80} />
            </View>
            <View style={contentContainer}>
              <CustomText style={boldText} numberOfLines={1}>
                {data.from_user.username}
              </CustomText>
              <View style={{ flexDirection: "row" }}>
                <CustomText style={labelStyle}>From: </CustomText>
                <CustomText style={regularText} numberOfLines={1}>
                  {data.from_user.email}
                </CustomText>
              </View>
              <View style={{ flexDirection: "row" }}>
                <CustomText style={labelStyle}>To: </CustomText>
                <CustomText style={regularText} numberOfLines={1}>
                  {data.to_user.email}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={subjectContainer}>
            <CustomText style={boldText}>{data.subject}</CustomText>
            <CustomText style={timestampStyle}>
              {this.renderTimestamp(data.timestamp)}
            </CustomText>
          </View>
          <View style={mailContainer}>
            <CustomText style={mailText}>{data.content}</CustomText>
          </View>
        </ScrollView>
        <FloatingButton
          iconName="reply"
          onPress={this.onReplyPress.bind(this, data)}
        />
      </View>
    );
  }
}
export default MailDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  },
  informationContainer: {
    flexDirection: "row",
    flex: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#999798",
    paddingHorizontal: 20,
    paddingVertical: 10
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
    paddingHorizontal: 10
  },
  mailContainer: {
    flex: 5,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  boldText: {
    fontFamily: Fonts.productSansBold,
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
