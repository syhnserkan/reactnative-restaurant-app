import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Error from "../../components/Error";
import StyledButton from "../../components/StyledButton";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import apiUrl from "../../connection/apiUrl";
import Toast from "react-native-toast-message";
import axios from "axios";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }
    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };

    axios
      .post(`${apiUrl}/users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please login into your account",
          });
          setTimeout(() => {
            navigation.navigate("Login");
          }, 750);
        }
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
        setError(err);
      });
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      enableOnAndroid={true}
      extraHeight={200}
    >
      <Form title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text.toLowerCase())}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text.toLowerCase())}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <StyledButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </StyledButton>
        </View>
        <View>
          <StyledButton
            large
            primary
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </StyledButton>
        </View>
      </Form>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;
