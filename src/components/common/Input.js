import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class Input extends Component {
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
      onFocus
    } = this.props;
    const { secureField, inputValue } = this.state;
    const {
      container,
      inputField,
      iconStyle,
      secureIconStyle,
      labelStyle
    } = styles;

    return (
      <View style={container}>
        <Text style={[{ fontWeight: "700", fontSize: 14 }, labelStyle]}>
          {labelText}
        </Text>
        <TextInput
          style={[inputField, inputStyle]}
          secureTextEntry={secureField}
          autoCorrect={false}
          onChangeText={this.onChangeText.bind(this)}
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

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  labelStyle: {
    fontSize: 20,
    paddingVertical: 10
  },
  inputField: {
    fontSize: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(218,218,218,1)"
  },
  secureIconStyle: {
    position: "absolute",
    right: 0,
    bottom: 15
  }
});
