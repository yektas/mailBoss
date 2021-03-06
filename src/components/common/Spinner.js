import React, { Component } from "react";
import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";

class Spinner extends Component {
  render() {
    const { animationType, visible } = this.props;
    return (
      <Modal
        onRequestClose={() => console.log("closing")}
        animationType={animationType}
        visible={visible}
        transparent
      >
        <View style={styles.wrapper}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      </Modal>
    );
  }
}
export { Spinner };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-around"
  },
  wrapper: {
    zIndex: 9,
    backgroundColor: "rgba(0,0,0,.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  },
  loaderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
