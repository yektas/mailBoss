import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomText } from "./CustomText";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionValue: new Animated.Value(-60)
    };
  }
  animateNotification(value) {
    const { positionValue } = this.state;
    Animated.timing(positionValue, {
      toValue: value,
      duration: 300,
      velocity: 3,
      tension: 2,
      friction: 8,
      easing: Easing.easeOutBack
    }).start();
  }
  closeNotification() {
    this.props.handleCloseNotification();
  }
  render() {
    const { type, firstLine, secondLine, showNotification } = this.props;
    showNotification //eslint-disable-line no-unused-expressions
      ? this.animateNotification(0)
      : this.animateNotification(-60);
    const { positionValue } = this.state;
    return (
      <Animated.View
        style={[{ marginBottom: positionValue }, styles.container]}
      >
        <View style={styles.content}>
          <CustomText style={styles.errorStyle}>{type}</CustomText>
          <CustomText style={styles.message}>{firstLine} </CustomText>
          <CustomText style={styles.message}>{secondLine}</CustomText>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeNotification.bind(this)}
        >
          <Icon name="ios-close" size={25} color={"#767475"} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
export { Notification };

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ffff",
    height: 60,
    width: "100%",
    padding: 10
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  errorStyle: {
    color: "#f44336",
    fontSize: 14,
    marginBottom: 2,
    marginRight: 5
  },
  message: {
    marginBottom: 2,
    fontSize: 14
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 5
  }
});
