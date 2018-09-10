import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomText } from "./common";

class ListItem extends Component {
  render() {
    const { data, onPress } = this.props;
    const {
      avatarContainer,
      contentContainer,
      dateContainer,
      container,
      peakText,
      headerText,
      subText,
      dateText
    } = styles;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={container}>
          <View style={avatarContainer}>
            <Icon name="ios-contact" color={"#3A373E"} size={80} />
          </View>
          <View style={contentContainer}>
            <CustomText style={headerText} numberOfLines={1}>
              {data.username}
            </CustomText>
            <CustomText style={subText} numberOfLines={1}>
              {data.email}
            </CustomText>
            <CustomText style={peakText} numberOfLines={1}>
              {data.last_email.content}
            </CustomText>
          </View>
          <View style={dateContainer}>
            <CustomText style={dateText}>{data.date}</CustomText>
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
  avatarContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    flex: 4,
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
    paddingVertical: 10
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
    fontSize: 20,
    color: "#3A373E"
  },
  subText: {
    fontSize: 18,
    color: "#3A373E"
  },
  peakText: {
    fontSize: 18,
    color: "#999798"
  }
});
