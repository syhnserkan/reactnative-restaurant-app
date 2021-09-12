import React from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";

import ProductItem from "./ProductItem";
const { width } = Dimensions.get("window");

const ProductList = ({ product, navigation }) => {
  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() => navigation.navigate("Food Detail", { item: product })}
    >
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
        <ProductItem {...product} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
