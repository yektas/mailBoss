import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { observer } from "mobx-react/native";
import Icon from "react-native-vector-icons/Ionicons";
import UserStore from "../../store/UserStore";
import { CustomText } from "./CustomText";

@observer
class IconBadge extends Component {
  state = {
    count: 0
  };

  componentDidMount() {
    this.setState({
      count: UserStore.unreadCount
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Icon name="ios-mail" color={this.props.tintColor} size={32} />
        {UserStore.unreadCount > 0 && (
          <View style={styles.badgeContainer}>
            <CustomText style={styles.valueStyle}>
              {UserStore.unreadCount}
            </CustomText>
          </View>
        )}
      </View>
    );
  }
}
export { IconBadge };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center"
  },
  badgeContainer: {
    position: "absolute",
    top: 8,
    right: -5,
    minWidth: 13,
    height: 13,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000"
  },
  valueStyle: {
    fontSize: 10,
    color: "#ffff",
    alignSelf: "center",
    justifyContent: "center"
  }
});
