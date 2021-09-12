import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StyledButton from "./StyledButton";

const SingleCategory = ({ item, deleteCategoryFromBackend }) => {
  console.log("cate", item);
  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
      <StyledButton
        onPress={() => {
          deleteCategoryFromBackend(item.id);
        }}
        medium
        danger
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
      </StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 1,
    elevation: 1,
    margin: 4,
    padding: 4,
    borderRadius: 5,
  },
});

export default SingleCategory;
