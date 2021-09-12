import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const FoodHeader = () => {
  return (
    <View style={styles.foodHeader} elevation={1}>
      <View style={styles.headerFood}></View>
      <View style={styles.headerFood}>
        <Text style={styles.text}>Name</Text>
      </View>
      <View style={styles.headerFood}>
        <Text style={styles.text}>Category</Text>
      </View>
      <View style={styles.headerFood}>
        <Text style={styles.text}>Price</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodHeader: {
    padding: 5,
    flexDirection: "row",
    backgroundColor: "gainsboro",
  },
  headerFood: {
    margin: 3,
    width: width / 6,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FoodHeader;
