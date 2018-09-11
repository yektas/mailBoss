import { AsyncStorage } from "react-native";

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("loggedInUser")
      .then(response => {
        if (response !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(error => reject(error));
  });
};
