import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiUrl from "../../connection/apiUrl";
import axios from "axios";

import defaultImages from "../../data/images.json";

//components
import Form from "../../components/Form";
import Input from "../../components/Input";
import Error from "../../components/Error";
import StyledButton from "../../components/StyledButton";

const FoodFormContainer = ({ navigation, route }) => {

  const [pickerVal, setPickerVal] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1514178255089-603d3a35b24a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  );
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [adminToken, setAdminToken] = useState();
  const [error, setError] = useState();
  const [ingredients, setIngredients] = useState();
  const [rating, setRating] = useState(0);
  const [isPopular, setIsPopular] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [food, setFood] = useState(null);

  useEffect(() => {
    if (!route.params) {
      setFood(null);
    } else {
      const { name, description, price, image, category } = route.params.item;
      setFood(route.params.item);
      setName(name);
      setDescription(description);
      setPrice(price.toString()), setImage(image), setCategory(category._id);
    }
    //adminToken
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setAdminToken(res);
      })
      .catch((err) => console.log("err", err));

    axios
      .get(`${apiUrl}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.log("error", err);
        setError(err);
      });

    return () => {
      setCategories([]);
      setError();
    };
  }, []);

  const addFood = () => {
    const isEmpty =
      [name, price, description, image, category].filter((item) => !!item)
        .length > 0;
    if (!isEmpty) setError("Please fill the form");

    const newProduct = {
      name: name,
      description,
      richDescription: richDescription,
      image: image,
      price: price,
      category: category,
      countInStock: 0,
      rating: rating,
      numReviews: numReviews,
      isPopular: isPopular,
    };

    if (food !== null) {
      axios
        .put(`${apiUrl}/products/${food.id}`, newProduct, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              type: "success",
              topOffset: 50,
              text1: "Food has been updated",
              text2: "",
            });
            setTimeout(() => {
              navigation.navigate("Products");
            }, 750);
            setError("");
          }
        })
        .catch((err) => {
          console.log("error", err);
          Toast.show({
            type: "error",
            topOffset: 50,
            text1: "Food has not been updated",
            text2: "",
          });
        });
    } else {
      axios
        .post(`${apiUrl}/products`, newProduct, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              type: "success",
              topOffset: 50,
              text1: "Food has been added",
              text2: "",
            });
            setTimeout(() => {
              navigation.navigate("Products");
            }, 750);
            setError("");
          }
        })
        .catch((err) => {
          console.log("error", err);
          Toast.show({
            type: "error",
            topOffset: 50,
            text1: "Food has not been added",
            text2: "",
          });
        });
    }
  };

  return (
    <Form title={food ? "Update Food" : "Add Food"}>
      {/* <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity style={styles.imagePicker}>
          <Text>IMAGE</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.text}>
        <Text>Name</Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        value={name}
        id="name"
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.text}>
        <Text>Price</Text>
      </View>
      <Input
        placeholder="Price"
        name="price"
        value={price}
        id="price"
        keyboardType={"numeric"}
        onChangeText={(price) => setPrice(price)}
      />
      <View style={styles.text}>
        <Text>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="description"
        value={description}
        id="description"
        onChangeText={(description) => setDescription(description)}
      />
      <View style={styles.text}>
        <Text>Select Image</Text>
      </View>
      <Item
        style={{
          width: "80%",
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "white",
          borderRadius: 20,
        }}
        picker
      >
        <Picker
          mode="dropdown"
          style={{ height: 50 }}
          iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
          selectedValue={image}
          placeholder="Select food image"
          placeholderIconColor="#007aff"
          onValueChange={(e) => {
            setImage(e);
          }}
        >
          {defaultImages.map((image, index) => {
            return (
              <Picker.Item key={index} label={image.name} value={image.link} />
            );
          })}
        </Picker>
      </Item>
      <View style={styles.text}>
        <Text>Select Category</Text>
      </View>
      <Item
        style={{
          width: "80%",
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: 10,
        }}
        picker
      >
        <Picker
          mode="dropdown"
          style={{ height: 50 }}
          iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
          selectedValue={pickerVal}
          placeholder="Select food category"
          placeholderIconColor="#007aff"
          onValueChange={(e) => [setPickerVal(e), setCategory(e)]}
        >
          {categories.map((category, index) => {
            return (
              <Picker.Item
                key={index}
                label={category.name}
                value={category.id}
              />
            );
          })}
        </Picker>
      </Item>
      {error ? <Error message={error} /> : null}
      <View style={styles.buttonGroup}>
        <StyledButton
          onPress={() => {
            addFood();
          }}
          large
          primary
        >
          <Text style={styles.buttonContentText}>Confirm</Text>
        </StyledButton>
      </View>
    </Form>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    width: "80%",
  },
  buttonGroup: {
    marginBottom: 70,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonContentText: {
    color: "#fff",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    bottom: 6,
    right: 6,
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  imageContainer: {
    borderStyle: "solid",
    borderColor: "#E0E0E0",
    borderWidth: 8,
    padding: 0,
    width: 200,
    height: 200,
    justifyContent: "center",
    elevation: 10,
    borderRadius: 100,
  },
});

export default FoodFormContainer;
