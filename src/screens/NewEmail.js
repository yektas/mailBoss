import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { observer } from "mobx-react/native";
import axios from "axios";
import UserStore from "../store/UserStore";
import Fonts from "../config/fonts";
import urls from "../config/urls";
import { CustomText, FloatingButton, Notification } from "../components/common";

@observer
class NewEmail extends Component {
  static navigationOptions = {
    title: "New Email"
  };

  constructor(props) {
    super(props);
    this.state = {
      toEmail: "",
      subject: "",
      content: "",
      emailValid: true,
      isUserExists: true,
      showNotification: false,
      messageOne: "",
      messageTwo: ""
    };
  }

  checkServerForEmail(toEmail) {
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    axios
      .post(
        urls.CheckUser,
        {
          email: toEmail
        },
        {
          headers: header
        }
      )
      .then(response => {
        this.setState(
          {
            isUserExists: true
          },
          () => this.sendEmail(toEmail)
        );
      })
      .catch(error => {
        this.setState({
          isUserExists: false,
          showNotification: true,
          messageOne: "There is no matching user with this email",
          messageTwo: "Please check it again."
        });
      });
  }

  handleEmailSend() {
    const { toEmail } = this.state;
    this.checkServerForEmail(toEmail);
  }

  handleCloseNotification() {
    this.setState({
      showNotification: false
    });
  }

  sendEmail(toEmail) {
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };

    const mail = {
      from_user: UserStore.user.userId,
      to_email: toEmail,
      subject: this.state.subject,
      content: this.state.content
    };
    axios
      .post(
        urls.SendEmail,
        {
          mail
        },
        { headers: header }
      )
      .then(response => {
        alert("Email sent");
        this.props.navigation.navigate("Inbox");
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const {
      container,
      informationContainer,
      contentStyle,
      contentWrapper,
      labelStyle,
      emailContainer,
      labelContainer,
      inputStyle
    } = styles;

    console.log(this.state.showNotification);
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
            <View style={emailContainer}>
              <TextInput
                style={inputStyle}
                keyboardType={"email-address"}
                autoCorrect={false}
                autoCapitalize={"none"}
                onChangeText={text => this.setState({ toEmail: text })}
                underlineColorAndroid={"transparent"}
              />
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
              onChangeText={text => this.setState({ subject: text })}
              underlineColorAndroid={"transparent"}
            />
          </View>
        </View>
        <View style={contentWrapper}>
          <TextInput
            style={contentStyle}
            autoCorrect={false}
            multiline
            onChangeText={text => this.setState({ content: text })}
            underlineColorAndroid={"transparent"}
            placeholder={"Say something"}
          />
        </View>
        <FloatingButton
          onPress={this.handleEmailSend.bind(this)}
          iconName="send"
        />
        <Notification
          showNotification={this.state.showNotification}
          handleCloseNotification={this.handleCloseNotification.bind(this)}
          type={"Error"}
          firstLine={this.state.messageOne}
          secondLine={this.state.messageTwo}
        />
      </View>
    );
  }
}
export default NewEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  },
  emailContainer: {
    flex: 5,
    paddingHorizontal: 10
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
    paddingHorizontal: 20,
    fontFamily: Fonts.productSansRegular
  }
});
