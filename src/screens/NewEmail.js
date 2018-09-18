import React, { Component } from "react";
import { View, TextInput, Animated, Easing, StyleSheet } from "react-native";
import { observer } from "mobx-react/native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ActionButton from "react-native-action-button";
import LottieView from "lottie-react-native";
import UserStore from "../store/UserStore";
import Fonts from "../config/fonts";
import urls from "../config/urls";
import { CustomText, Notification } from "../components/common";
import images from "../config/images";

@observer
class NewEmail extends Component {
  static navigationOptions = {
    title: "New Email"
  };

  constructor(props) {
    super(props);
    this.state = {
      receiverEmail: "",
      subject: "",
      body: "",
      emailValid: true,
      isUserExists: true,
      progress: new Animated.Value(0),
      showAnimation: false,
      showNotification: false,
      messageOne: "",
      messageTwo: ""
    };
  }

  checkServerForEmail(receiverEmail) {
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    axios
      .post(
        urls.CheckUser,
        {
          email: receiverEmail
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
          () => this.sendEmail(receiverEmail)
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
    const { receiverEmail, subject, body } = this.state;
    if (receiverEmail === "" || subject === "" || body === "") {
      this.setState({
        showNotification: true,
        messageOne: "Please fill all the fields and try again!"
      });
    } else {
      this.checkServerForEmail(receiverEmail);
    }
  }

  handleCloseNotification() {
    this.setState({
      showNotification: false
    });
  }
  sendEmail(receiverEmail) {
    this.setState({
      showAnimation: true
    });
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };

    const mail = {
      sender_id: UserStore.user.userId,
      receiver_email: receiverEmail,
      subject: this.state.subject,
      body: this.state.body
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
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear
        }).start(() => this.props.navigation.navigate("Inbox"));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {
      container,
      informationContainer,
      bodyStyle,
      bodyWrapper,
      labelStyle,
      emailContainer,
      labelContainer,
      inputStyle
    } = styles;
    return (
      <View style={container}>
        <View style={informationContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              borderBottomWidth: 0.3,
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
                onChangeText={text => this.setState({ receiverEmail: text })}
                underlineColorAndroid={"transparent"}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              borderBottomWidth: 0.3,
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
        <View style={bodyWrapper}>
          <TextInput
            style={bodyStyle}
            autoCorrect={false}
            multiline
            onChangeText={text => this.setState({ body: text })}
            underlineColorAndroid={"transparent"}
            placeholder={"Say something"}
          />
        </View>
        <ActionButton
          buttonColor="#ff3d00"
          renderIcon={() => <Icon color={"#ffff"} name={"send"} size={22} />}
          onPress={this.handleEmailSend.bind(this)}
        />
        <Notification
          showNotification={this.state.showNotification}
          handleCloseNotification={this.handleCloseNotification.bind(this)}
          type={"Error"}
          firstLine={this.state.messageOne}
          secondLine={this.state.messageTwo}
        />
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
  bodyWrapper: {
    flex: 6
  },
  bodyStyle: {
    fontSize: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    fontFamily: Fonts.productSansRegular
  }
});
