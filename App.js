import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { observer } from "mobx-react";
import { createRootNavigator } from "./src/router";
import { isSignedIn } from "./src/auth";

const App = observer(() => {
  const [signedIn, setSignedIn] = useState(false);

  const [fontLoaded] = useFonts({
    "Product-Sans": require("./src/assets/fonts/Product-Sans-Regular.ttf"),
  });

  useEffect(() => {
    isSignedIn()
      .then((response) => setSignedIn(response))
      .catch((err) => console.log(err));
  }, []);

  const RootNavigator = createRootNavigator(signedIn);

  return <View style={{ flex: 1 }}>{fontLoaded ? <RootNavigator /> : null}</View>;
});
export default App;
