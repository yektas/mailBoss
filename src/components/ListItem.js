import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import format from "date-fns/format";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomText } from "./common";

class ListItem extends Component {
  renderUnreadIndicator(data) {
    if (this.props.type === "email") {
      return !data.read && <View style={styles.unreadIndicator} />;
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
      return format(new Date(data.timestamp), "DD.MM.YYYY HH:mm A");
    } else if (data.last_email !== "") {
      return format(new Date(data.last_email.timestamp), "DD MMM");
    }
    return null;
  }

  renderByType(data, type) {
    let headerText = "";
    let subText = "";
    let content = "";
    let peakTextLines = 0;

    if (type === "email") {
      headerText = data.from_user.username;
      subText = data.subject;
      content = data.content;
      peakTextLines = 2;
    } else {
      headerText = data.username;
      subText = data.email;
      content = data.last_email.content;
      peakTextLines = 1;
    }
    return (
      <View style={styles.contentContainer}>
        <CustomText style={styles.headerText} numberOfLines={1}>
          {headerText}
        </CustomText>
        <CustomText style={styles.subText} numberOfLines={1}>
          {subText}
        </CustomText>
        <CustomText style={styles.peakText} numberOfLines={peakTextLines}>
          {content}
        </CustomText>
      </View>
    );
  }

  render() {
    const { data, onPress, type } = this.props;

    const { contentContainer, dateContainer, container, dateText } = styles;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={container}>
          {this.renderUnreadIndicator(data)}
          {this.renderAvatarIcon()}
          <View style={contentContainer}>{this.renderByType(data, type)}</View>
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
  contentContainer: {
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
    color: "#3A373E"
  },
  subText: {
    fontSize: 18,
    color: "#3A373E"
  },
  peakText: {
    fontSize: 17,
    color: "#999798"
  }
});
