import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import COLORS from "../consts/colors";

const Navbar = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../assets/restaurant1.jpg")}
        resizeMode="contain"
        style={{ height: 60, marginTop: 10, borderRadius: 50, width: "100%" }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 15,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Navbar;
