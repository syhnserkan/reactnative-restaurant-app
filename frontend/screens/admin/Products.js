import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import { Item, Header, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

import apiUrl from "../../connection/apiUrl";
import axios from "axios";

import ListFood from "./ListFood";
import FoodHeader from "../../components/FoodHeader";
import StyledButton from "../../components/StyledButton";

const { width, height } = Dimensions.get("window");

const Products = ({ navigation }) => {
  const [foodList, setFoodList] = useState();
  const [foodFilter, setFoodFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setUserToken(res);
        })
        .catch((err) => {
          console.log("error", err);
        });

      axios.get(`${apiUrl}/products`).then((res) => {
        setFoodList(res.data);
        setFoodFilter(res.data);
        setLoading(false);
      });

      return () => {
        setFoodList();
        setFoodFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchFood = (text) => {
    text === ""
      ? setFoodFilter(foodList)
      : setFoodFilter(
          foodList.filter((food) =>
            food.name.toLowerCase().includes(text.toLowerCase())
          )
        );
  };

  const deleteFood = (id) => {
    axios
      .delete(`${apiUrl}/products/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        const foods = foodFilter.filter((food) => food.id !== id);
        setFoodFilter(foods);
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonGroup}>
        <StyledButton
          medium
          secondary
          onPress={() => navigation.navigate("Orders")}
        >
          <Icon name="shopping-bag" size={17} color="white" />
          <Text style={styles.text}>Orders</Text>
        </StyledButton>
        <StyledButton
          medium
          secondary
          onPress={() => navigation.navigate("FoodFormContainer")}
        >
          <Icon name="plus" size={17} color="white" />
          <Text style={styles.text}>Products</Text>
        </StyledButton>
        <StyledButton
          medium
          secondary
          onPress={() => navigation.navigate("Categories")}
        >
          <Icon name="plus" size={17} color="white" />
          <Text style={styles.text}>Categories</Text>
        </StyledButton>
      </View>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => searchFood(text)}
            />
          </Item>
        </Header>
      </View>
      {loading ? (
        <View style={styles.loadingSpinner}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={foodFilter}
          ListHeaderComponent={FoodHeader}
          renderItem={({ item, index }) => (
            <ListFood
              {...item}
              index={index}
              navigation={navigation}
              key={index}
              deleteFood={deleteFood}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingSpinner: {
    alignItems: "center",
    justifyContent: "center",
    height: height / 2,
  },
  mainContainer: {
    marginBottom: 140,
    backgroundColor: "white",
  },
  buttonGroup: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    marginLeft: 5,
  },
});

export default Products;
