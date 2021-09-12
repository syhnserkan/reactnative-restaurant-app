import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Right, Left, Text, ListItem, Body, Thumbnail } from "native-base";

const CardFood = ({ item: { product } }) => {
  const food = product;
  const [quantity, setQuantity] = useState(food.quantity);
  return (
    <ListItem style={styles.listItem} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: food.image
              ? food.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text> {food.name} </Text>
        </Left>
        <Right>
          <Text>$ {food.price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default CardFood;
