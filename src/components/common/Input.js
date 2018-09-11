import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomText } from "./CustomText";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureField: !(props.inputType === "text" || props.inputType === "email"),
      inputValue: props.defaultValue
    };
  }
  onPasswordToggle() {
    this.setState({ secureField: !this.state.secureField });
  }

  onChangeText(text) {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
  }

  render() {
    const {
      labelText,
      inputType,
      placeholder,
      defaultValue,
      inputStyle,
      onFocus,
      customLabelStyle
    } = this.props;
    const { secureField, inputValue } = this.state;
    const {
      container,
      inputField,
      iconStyle,
      secureIconStyle,
      labelStyle
    } = styles;
    const keyboardType = inputType === "email" ? "email-address" : "default";
    return (
      <View style={container}>
        <CustomText style={[labelStyle, customLabelStyle]}>
          {labelText}
        </CustomText>
        <TextInput
          style={[inputField, inputStyle]}
          secureTextEntry={secureField}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChangeText={this.onChangeText.bind(this)}
          underlineColorAndroid={"transparent"}
          keyboardType={keyboardType}
          onFocus={onFocus}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={inputValue}
        />
        {inputType === "password" && (
          <TouchableOpacity
            style={secureIconStyle}
            onPress={this.onPasswordToggle.bind(this)}
          >
            <Icon name="ios-eye-off" size={25} style={iconStyle} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export { Input };

const styles = StyleSheet.create({
  container: {
    padding: 2
  },
  labelStyle: {
    fontSize: 20,
    paddingVertical: 5,
    color: "#FDD835"
  },
  inputField: {
    fontSize: 20,
    height: 40,
    paddingHorizontal: 5,
    marginBottom: 5,
    backgroundColor: "transparent",
    borderBottomWidth: 0.5,
    borderBottomColor: "#FDD835",
    fontFamily: "ProductSans-Regular",
    color: "#ffff"
  },
  secureIconStyle: {
    position: "absolute",
    right: 15,
    bottom: 15
  },
  iconStyle: {
    color: "#ffff"
  }
});
