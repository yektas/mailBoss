import React from "react";
import { View } from "react-native";
import { Font } from "expo";
import MailBoss from "./src/MailBoss";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "Product-Sans": require("./assets/fonts/Product-Sans-Regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? <MailBoss /> : null}
      </View>
    );
  }
}
