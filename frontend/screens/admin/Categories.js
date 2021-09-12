import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledButton from "../../components/StyledButton";
import SingleCategory from "../../components/SingleCategory";
import apiUrl from "../../connection/apiUrl";
import axios from "axios";

const { width } = Dimensions.get("window");

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState();
  const [adminToken, setAdminToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setAdminToken(res);
      })
      .catch((err) => console.log("error", err));

    axios
      .get(`${apiUrl}/categories`)
      .then(({ data }) => setCategories(data))
      .catch((err) => alert("Error: Load to catgories"));
    return () => {};
  }, []);

  const addCategoryToBackend = () => {
    const newCategory = { name: catName };

    axios
      .post(`${apiUrl}/categories`, newCategory, {
        headers: {
          Autherization: `Bearer ${adminToken}`,
        },
      })
      .then(({ data }) => {
        setCategories([...categories, data]);
        setCatName("");
      })
      .catch((err) => {
        console.log("error", err);
        alert("Error to add categories");
      });
  };

  const deleteCategoryFromBackend = (id) => {
    axios
      .delete(`${apiUrl}/categories/${id}`, {
        headers: {
          Autherization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        const newCategories = categories.filter(
          (category) => category.id !== id
        );
        setCategories(newCategories);
        //add toast
      })
      .catch((err) => {
        console.log("err", err);
        alert("Error to delete categories");
      });
  };
  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 50 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <SingleCategory
              key={index}
              item={item}
              deleteCategoryFromBackend={deleteCategoryFromBackend}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottom}>
        <View>
          <Text>Add Category</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={catName}
            style={styles.textInput}
            onChangeText={(name) => setCatName(name)}
          />
        </View>
        <View>
          <StyledButton onPress={() => addCategoryToBackend()} medium primary>
            <Text style={styles.text}>Add</Text>
          </StyledButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: 60,
    padding: 3,
    backgroundColor: "#fff",
  },
  textInput: {
    borderColor: "gray",
    height: 40,
    borderWidth: 1,
  },
});

export default Categories;
