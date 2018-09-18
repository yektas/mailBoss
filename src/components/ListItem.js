import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import format from "date-fns/format";
import Icon from "react-native-vector-icons/Ionicons";
import { observer } from "mobx-react/native";
import UserStore from "../store/UserStore";
import Fonts from "../config/fonts";
import { CustomText } from "./common";

@observer
class ListItem extends Component {
  renderUnreadIndicator(data) {
    const userID = UserStore.user.userId;
    if (this.props.type === "email") {
      if (data.status.user.id === userID)
        return !data.status.isRead && <View style={styles.unreadIndicator} />;
    }
  }

  renderAvatarIcon() {
    return (
      this.props.avatarIcon && (
        <View style={styles.avatarContainer}>
          <Icon name="ios-contact" color={"#3A373E"} size={80} />
        </View>
      )
    );
  }

  renderFormattedDate(data, type) {
    if (type === "email") {
      return format(
        new Date(data.lastReply.message.timestamp),
        "DD.MM.YYYY HH:mm"
      );
    } else if (type === "between") {
      return format(new Date(data.timestamp), "DD.MM.YYYY HH:mm");
    } else if (data.last_email !== "") {
      return format(new Date(data.last_email.message.timestamp), "DD MMM");
    }
    return null;
  }

  renderByType(data, type) {
    let headerText = "";
    let subText = "";
    let body = "";
    let peakTextLines = 0;

    if (type === "email") {
      if (data.parentMail.message.sender.id === UserStore.user.userId) {
        headerText = "Me";
      } else {
        headerText = data.parentMail.message.sender.username;
      }
      subText = data.parentMail.message.subject;
      body = data.parentMail.message.body;
      peakTextLines = 2;
    } else if (type === "between") {
      headerText = data.sender.username;
      subText = data.subject;
      body = data.body;
      peakTextLines = 2;
    } else {
      headerText = data.username;
      subText = data.email;
      body = data.last_email.message.body;
      peakTextLines = 1;
    }
    return (
      <View style={styles.bodyContainer}>
        <CustomText style={styles.headerText} numberOfLines={1}>
          {headerText}
        </CustomText>
        <CustomText style={styles.subText} numberOfLines={1}>
          {subText}
        </CustomText>
        <CustomText style={styles.peakText} numberOfLines={peakTextLines}>
          {body}
        </CustomText>
      </View>
    );
  }

  render() {
    const { data, onPress, type } = this.props;
    const { bodyContainer, dateContainer, container, dateText } = styles;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={container}>
          {this.renderUnreadIndicator(data)}
          {this.renderAvatarIcon()}
          <View style={bodyContainer}>{this.renderByType(data, type)}</View>
          <View style={dateContainer}>
            <CustomText style={dateText}>
              {this.renderFormattedDate(data, type)}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 90,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#999798"
  },
  unreadIndicator: {
    position: "absolute",
    height: 60,
    width: 4,
    borderRadius: 10,
    backgroundColor: "#ff3d00",
    alignSelf: "center"
  },
  avatarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    marginRight: -20
  },
  bodyContainer: {
    flex: 3,
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingLeft: 15,
    paddingRight: 10
  },
  dateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dateText: {
    color: "#999798",
    fontSize: 16
  },
  headerText: {
    fontSize: 22,
    fontFamily: Fonts.productSansBold,
    color: "#3A373E"
  },
  subText: {
    fontSize: 18,
    color: "#3A373E"
  },
  peakText: {
    fontSize: 16,
    color: "#999798"
  }
});
