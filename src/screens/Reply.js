import React, { Component } from "react";
import { View, Animated, Easing, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import { observer } from "mobx-react/native";
import LottieView from "lottie-react-native";
import images from "../config/images";
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
    const loggedInUser = UserStore.user;
    let receiver = "";
    if (mail.parentMail.message.sender.id === loggedInUser.userId) {
      receiver = mail.parentMail.receiver;
    } else {
      receiver = mail.parentMail.message.sender;
    }

    const subject = `Re: ${mail.parentMail.message.subject}`;

    this.state = {
      emailValid: true,
      loading: false,
      receiver,
      showAnimation: false,
      progress: new Animated.Value(0),
      body: "",
      subject
    };
  }

  handleReply() {
    const replyMail = {
      parent_id: this.props.navigation.getParam("mail").parentMail.message.id,
      sender_id: UserStore.user.userId,
      receiver_id: this.state.receiver.id,
      subject: this.state.subject,
      body: this.state.body
    };
    this.sendReply(replyMail);
  }

  sendReply(mail) {
    this.setState({
      showAnimation: true
    });
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    const url = `${urls.UserEmails}/reply/`;
    axios
      .post(
        url,
        {
          data: mail
        },
        {
          headers: header
        }
      )
      .then(response => {
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear
        }).start(() => this.props.navigation.navigate("Inbox"));
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const {
      container,
      informationContainer,
      emailContainer,
      labelStyle,
      labelContainer,
      emailStyle,
      inputStyle,
      bodyWrapper,
      bodyStyle
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
              <CustomText style={emailStyle}>
                {this.state.receiver.email}
              </CustomText>
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
              onChangeText={text => this.setState({ subject: text })}
              underlineColorAndroid={"transparent"}
              defaultValue={this.state.subject}
            />
          </View>
        </View>
        <View style={bodyWrapper}>
          <TextInput
            style={bodyStyle}
            autoCorrect={false}
            multiline
            autoCapitalize={"none"}
            onChangeText={text => this.setState({ body: text })}
            underlineColorAndroid={"transparent"}
            placeholder={"Say something"}
          />
        </View>
        {this.state.showAnimation && (
          <LottieView
            source={images.mailAnimation}
            progress={this.state.progress}
            style={{
              zIndex: 9
            }}
            resizeMode="cover"
          />
        )}
        <FloatingButton onPress={this.handleReply.bind(this)} iconName="send" />
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
  bodyWrapper: {
    flex: 6
  },
  bodyStyle: {
    fontSize: 20,
    fontFamily: Fonts.productSansRegular,
    paddingHorizontal: 20
  }
});
