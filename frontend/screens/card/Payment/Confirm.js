import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import { Left, Right, Text, ListItem, Thumbnail, Body } from "native-base";

import axios from "axios";
import apiUrl from "../../../connection/apiUrl";
import Toast from "react-native-toast-message";

import * as actions from "../../../store/action";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");
const Confirm = ({ route: { params }, clearCard, navigation }) => {
  const confirm = params;
  const confirmOrder = () => {
    const newOrder = confirm.order.order;
    const newOrderFoods = newOrder.orderFoods.reduce((acc, cur) => {
      acc.push({
        product: cur["product"].id,
        quantity: cur["quantity"],
      });
      return acc;
    }, []);
    console.log("newOrderFoods", newOrderFoods);
    const fixedOrder = {
      ...newOrder,
      orderFoods: newOrderFoods,
    };
    axios
      .post(`${apiUrl}/orders`, fixedOrder)
      .then(({ status }) => {
        if (status == 200) {
          Toast.show({
            topOffset: 50,
            type: "success",
            text1: "Order has been completed!",
            text2: "",
          });
          setTimeout(() => {
            clearCard();
            navigation.navigate("Card");
          }, 750);
        }
      })
      .catch((err) => {
        console.log("error", err);
        Toast.show({
          topOffset: 50,
          type: "error",
          text1: "Order has not been completed!",
          text2: "Try again !",
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
        {params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address : {confirm.order.order.shippingAddress1}</Text>
              <Text>Address 2 : {confirm.order.order.shippingAddress2}</Text>
              <Text>City : {confirm.order.order.city}</Text>
              <Text>Zip Code : {confirm.order.order.zip}</Text>
              <Text>Country : {confirm.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Foods:</Text>
            {confirm.order.order.orderFoods.map((item, index) => {
              return (
                <ListItem key={index} style={styles.listItem} avatar>
                  <Left>
                    <Thumbnail source={{ uri: item.product.image }} />
                  </Left>
                  <Body style={styles.body}>
                    <Left>
                      <Text>{item.product.name}</Text>
                    </Left>
                    <Right>
                      <Text>$ {item.product.price}</Text>
                    </Right>
                  </Body>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 15 }}>
          <Button title={"Place order"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCard: () => dispatch(actions.clearCard()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    backgroundColor: "white",
    alignContent: "center",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    margin: 8,
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
