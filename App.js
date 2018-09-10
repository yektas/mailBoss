import React from "react";
import { View } from "react-native";
import { Font } from "expo";
import { createRootNavigator } from "./src/router";
import { isSignedIn } from "./src/auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      signedIn: false
    };
  }

  async componentDidMount() {
    isSignedIn()
      .then(response => this.setState({ signedIn: response }))
      .catch(err => console.log(err));
    await Font.loadAsync({
      "Product-Sans": require("./src/assets/fonts/Product-Sans-Regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const RootNavigator = createRootNavigator(this.state.signedIn);
    return (
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? <RootNavigator /> : null}
      </View>
    );
  }
}
