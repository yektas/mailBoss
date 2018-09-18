import React, { Component } from "react";
import { View, YellowBox, StatusBar } from "react-native";
import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
    YellowBox.ignoreWarnings([
      "Warning: isMounted(...) is deprecated",
      "Module RCTImageLoader"
    ]);
  }

  componentWillMount() {
    isSignedIn()
      .then(response => this.setState({ signedIn: response }))
      .catch(err => console.log(err));
  }

  render() {
    const RootNavigator = createRootNavigator(this.state.signedIn);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <RootNavigator />
      </View>
    );
  }
}
