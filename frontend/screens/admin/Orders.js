import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList } from "react-native";

import SingleOrder from "../../components/SingleOrder";

import apiUrl from "../../connection/apiUrl";
import axios from "axios";

const Orders = ({ navigation }) => {
  const [allOrderList, setAllOrderList] = useState();

  useEffect(() => {
    getAllOrders();

    return () => {
      setAllOrderList();
    };
  }, []);

  const getAllOrders = () => {
    axios
      .get(`${apiUrl}/orders`)
      .then(({ data }) => {
        setAllOrderList(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <View>
      <FlatList
        data={allOrderList}
        renderItem={({ item, index }) => (
          <SingleOrder key={index} navigation={navigation} item={item} />
        )}
      />
    </View>
  );
};

export default Orders;
