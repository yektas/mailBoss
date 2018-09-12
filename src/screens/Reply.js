import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import { observer } from "mobx-react/native";
import UserStore from "../store/UserStore";
import urls from "../config/urls";
import { CustomText, FloatingButton } from "../components/common";
import Fonts from "../config/fonts";

@observer
class Reply extends Component {
  static navigationOptions = {
    title: "Reply"
  };
  constructor(props) {
    super(props);
    const mail = this.props.navigation.getParam("mail");
    this.state = {
      emailValid: true,
      loading: false,
      content: mail.content,
      subject: mail.subject
    };
  }

  handleReply(mail) {
    this.setState({
      loading: false
    });
    const toUser = mail.from_user;
    const replyMail = {
      id: mail.id,
      to_user: toUser.id,
      subject: this.state.subject,
      content: this.state.content
    };
    this.sendReply(replyMail);
  }

  sendReply(mail) {
    const data = {
      from_user: UserStore.user.userId,
      to_user: mail.to_user,
      subject: mail.subject,
      content: mail.content
    };
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    axios
      .post(`${urls.UserEmails}/${mail.id}/reply/`, {
        data,
        headers: header
      })
      .then(response => {
        console.log(response);
        this.setState({
          loading: false
        });
        alert("Reply sent.");
        this.props.navigation.navigate("Inbox");
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const mail = this.props.navigation.getParam("mail");
    console.log(mail);
    const {
      container,
      informationContainer,
      emailContainer,
      labelStyle,
      labelContainer,
      emailStyle,
      inputStyle,
      contentWrapper,
      contentStyle
    } = styles;
    return (
      <View style={container}>
        <View style={informationContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              borderBottomWidth: 0.5,
              borderBottomColor: "#999798",
              alignItems: "center"
            }}
          >
            <View style={labelContainer}>
              <CustomText style={labelStyle}>To : </CustomText>
            </View>
            <View pointerEvents={"none"} style={emailContainer}>
              <CustomText style={emailStyle}>{mail.from_user.email}</CustomText>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              borderBottomWidth: 0.5,
              borderBottomColor: "#999798",
              alignItems: "center"
            }}
          >
            <View style={labelContainer}>
              <CustomText style={labelStyle}>Subject: </CustomText>
            </View>
            <TextInput
              style={inputStyle}
              autoCorrect={false}
              autoCapitalize={"none"}
              name="subject"
              onChangeText={text => this.setState({ subject: text })}
              underlineColorAndroid={"transparent"}
              defaultValue={this.state.subject}
            />
          </View>
        </View>
        <View style={contentWrapper}>
          <TextInput
            style={contentStyle}
            autoCorrect={false}
            multiline
            name="content"
            autoCapitalize={"none"}
            onChangeText={text => this.setState({ content: text })}
            underlineColorAndroid={"transparent"}
            placeholder={"Say something"}
          />
        </View>
        <FloatingButton
          onPress={this.handleReply.bind(this, mail)}
          iconName="send"
        />
      </View>
    );
  }
}
export default Reply;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  },
  emailContainer: {
    flex: 5,
    paddingHorizontal: 10
  },
  emailStyle: {
    fontSize: 20,
    color: "#7A7D92"
  },
  labelContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    padding: 8,
    backgroundColor: "#421C6B",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  inputStyle: {
    flex: 6,
    fontSize: 20,
    paddingHorizontal: 10,
    fontFamily: Fonts.productSansRegular
  },
  labelStyle: {
    fontSize: 18,
    alignSelf: "center",
    color: "#ffff"
  },
  subjectStyle: {
    flex: 5,
    paddingHorizontal: 10,
    fontFamily: Fonts.productSansRegular,
    fontSize: 18
  },
  informationContainer: {
    flex: 2,
    flexDirection: "column"
  },
  contentWrapper: {
    flex: 6
  },
  contentStyle: {
    fontSize: 20,
    fontFamily: Fonts.productSansRegular,
    paddingHorizontal: 20
  }
});
