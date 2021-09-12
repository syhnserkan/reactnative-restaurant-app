import React from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  Image,
} from "react-native";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import StyledButton from "../../components/StyledButton";
import * as actions from "../../store/action";
import COLORS from "../../consts/colors";

const { width } = Dimensions.get("window");

const ProductItem = ({
  name,
  price,
  image,
  countInStock,
  id,
  addFoodToCard,
}) => {
  const foodItem = {
    id,
    name,
    price,
    image,
    countInStock,
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>Price : ${price}</Text>

      <View style={{ marginBottom: 60 }}>
        <StyledButton
          medium
          primary
          onPress={() => {
            addFoodToCard(foodItem);
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: `${name} added to Card`,
              text2: "Go to your card to complete order",
            });
          }}
        >
          <Text style={{ color: "white" }}>Add</Text>
        </StyledButton>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFoodToCard: (product) =>
      dispatch(actions.addToCard({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8, // for box shadow
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    borderRadius: 10,
    top: -45,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    marginTop: 10,
    color: COLORS.dark,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
});

export default connect(null, mapDispatchToProps)(ProductItem);
