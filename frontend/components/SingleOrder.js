import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Toast from "react-native-toast-message";
import StyledButton from "./StyledButton";
import axios from "axios";
import apiUrl from "../connection/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleOrder = ({ item, navigation }) => {
  const [orderStatusText, setOrderStatusText] = useState();
  const [changeStatus, setChangeStatus] = useState("Pending");
  const [adminToken, setAdminToken] = useState();
  const [orderColor, setOrderColor] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setAdminToken(res);
      })
      .catch((err) => console.log("error", err));

    setOrderStatusText(item.status);
    if (item.status == "Pending") {
      setOrderColor("#e74c3c");
    } else if (item.status == "Shipped") {
      setOrderColor("#f1c40f");
    } else {
      setOrderColor("#2ecc71");
    }
    return () => {
      setOrderColor();
      setOrderStatusText();
    };
  }, []);

  const updateOrderStatus = () => {
    const updatedOrder = {
      ...item,
      status: changeStatus,
    };
    if (orderStatusText !== changeStatus) {
      axios
        .put(`${apiUrl}/orders/${item.id}`, updatedOrder, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })
        .then(({ status }) => {
          if (status == "200") {
            Toast.show({
              type: "success",
              topOffset: 50,
              text1: "Order status has been updated",
              text2: "",
            });
          }
          setTimeout(() => {
            navigation.navigate("Products");
          }, 750);
        })
        .catch((err) => {
          console.log("error", err);
          Toast.show({
            type: "error",
            topOffset: 50,
            text1: "Order status has not been updated",
            text2: "",
          });
        });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: orderColor }]}>
      <View style={styles.container}>
        <Text>Order Number: #{item.id}</Text>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text>Status: {item.status}</Text>
        <Text>Address Line: {item.addressLine1}</Text>
        <Text>City: {item.city}</Text>
        <Text>Country: {item.country}</Text>
        <Text>Date: {item.dateOrdered.split("T")[0]}</Text>
        <View>
          <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
            Price: ${item.totalPrice}
          </Text>
        </View>
        <Picker
          style={{ height: 80 }}
          mode="dropdown"
          selectedValue={changeStatus}
          name="arrow-down"
          onValueChange={(e) => setChangeStatus(e)}
        >
          {["Pending", "Shipped", "Delivered"].map((status, index) => {
            return <Picker.Item key={index} label={status} value={status} />;
          })}
        </Picker>
        <StyledButton
          onPress={() => {
            updateOrderStatus();
          }}
          large
          secondary
        >
          <Text style={{ color: "#fff" }}>Update Status</Text>
        </StyledButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 25,
    margin: 10,
  },
  orderTitle: {
    padding: 5,
  },
});

export default SingleOrder;
