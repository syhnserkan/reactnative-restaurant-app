import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Form from "../../components/Form";
import Error from "../../components/Error";
import Input from "../../components/Input";
import StyledButton from "../../components/StyledButton";

import AuthGlobal from "../../context/AuthGlobal";
import { loginUser } from "../../context/Auth.actions";
import COLORS from "../../consts/colors";

const Login = ({ navigation }) => {
  const context = useContext(AuthGlobal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate("Profile");
    }
    // return () => {};
  }, [context.stateUser.isAuthenticated]); //dependencies

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("Please fill in your credential");
    } else {
      loginUser(user, context.dispatch);
      setError("");
    }
  };

  return (
    <Form title={"Login"}>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        {error ? <Error message={error} /> : null}
        <StyledButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: COLORS.white }}>Login</Text>
        </StyledButton>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.text}>Don't have an account yet ?</Text>
        <StyledButton
          large
          secondary
          margin
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: COLORS.white }}>Register</Text>
        </StyledButton>
      </View>
    </Form>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    alignItems: "center",
  },
  text: {
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default Login;
