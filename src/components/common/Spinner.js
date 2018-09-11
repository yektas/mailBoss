import React, { Component } from "react";
import { View, Image, Modal, StyleSheet } from "react-native";
import Images from "../../config/images";

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
            <Image source={Images.loader} style={styles.loaderImage} />
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
    width: 150,
    height: 150,
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -75,
    marginTop: -75
  },
  loaderImage: {
    width: 150,
    height: 150
  }
});
