import React, { useState, useContext, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, Button, ScrollView, StyleSheet } from "react-native";
import { Container } from "native-base";
import apiUrl from "../../connection/apiUrl";
import COLORS from "../../consts/colors";
import StyledButton from "../../components/StyledButton";
import axios from "axios";

import AuthGlobal from "../../context/AuthGlobal";
import { logoutUser } from "../../context/Auth.actions";

const Profile = ({ navigation }) => {
  const context = useContext(AuthGlobal);
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (!context.stateUser.isAuthenticated) {
      navigation.navigate("Login");
    }
    console.log("user", context.stateUser.user);
    AsyncStorage.getItem("jwt")
      .then((res) => {
        console.log(`${apiUrl}/users/${context.stateUser.user.userId}`);
        axios
          .get(`${apiUrl}/users/${context.stateUser.user.userId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${res}`,
            },
          })
          .then((user) => {
            setProfile(user.data);
          })
          .catch((err) => console.log("err2 ", err));
      })
      .catch((err) => {
        console.log("error", err);
      });

    return () => {
      setProfile();
    };
  }, [context.stateUser.isAuthenticated]);

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.childContainer}>
        <Text style={{ fontSize: 30 }}>{profile ? profile.name : ""}</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email : {profile ? profile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone : {profile ? profile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <StyledButton
            onPress={() => {
              AsyncStorage.removeItem("jwt"), logoutUser(context.dispatch);
            }}
            medium
            primary
          >
            <Text style={{ color: COLORS.white }}>SIGN OUT</Text>
          </StyledButton>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  childContainer: {
    alignItems: "center",
    marginTop: 50,
  },
});

export default Profile;
