import React from "react";
import { TextInput, StyleSheet } from "react-native";
const Input = ({
  placeholder,
  name,
  id,
  value,
  autoCorrect,
  onChangeText,
  onFocus,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <TextInput
      style={styles.formInput}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      autoCorrect={autoCorrect}
      onChangeText={onChangeText}
      onFocus={onFocus}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  formInput: {
    width: "80%",
    height: 60,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: "orange",
  },
});

export default Input;
