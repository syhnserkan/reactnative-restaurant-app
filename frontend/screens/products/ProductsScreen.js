import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ActivityIndicator, // for loading icon
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../components/Banner";
import CategoryBanner from "./CategoryBanner";
import COLORS from "../../consts/colors";

const fakeData = require("../../data/fakeProduct.json");
const fakeCategories = require("../../data/fakeCategories.json");
const { height } = Dimensions.get("window");

import apiUrl from "../../connection/apiUrl";
import axios from "axios";

const ProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState();
  const [initialProducts, setInitialProducts] = useState([]);
  const [productsFilteredByCategory, setProductsFilteredByCategory] = useState(
    []
  );
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    //when we navigate the page, the request will be send
    useCallback(() => {
      setActive(-1);
      //Products
      axios
        .get(`${apiUrl}/products`)
        .then((res) => {
          setProducts(res.data);
          setFilteredProducts(res.data);
          setProductsFilteredByCategory(res.data);
          setInitialProducts(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));

      //Categories
      axios
        .get(`${apiUrl}/categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {
        setProducts([]);
        setFilteredProducts([]);
        setActive();
        setInitialProducts([]);
        setCategories([]);
        setProductsFilteredByCategory([]);
      };
    }, [])
  );

  const filteredProductsByText = (text) => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openProductList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCategory = (category) => {
    if (category === "all") {
      setProductsFilteredByCategory(initialProducts);
      setActive(true);
    } else {
      setProductsFilteredByCategory(
        products.filter((product) => product.category._id == category)
      );
      setActive(true);
    }
  };

  return (
    <>
      {!loading ? (
        <Container>
          <View style={{ flex: 1 }}>
            <Header
              style={{ backgroundColor: COLORS.primary }}
              searchBar
              rounded
            >
              <Item>
                <Icon name="ios-search" />
                <Input
                  placeholder="Search"
                  onFocus={openProductList}
                  onChangeText={(text) => filteredProductsByText(text)}
                />
                {focus ? <Icon onPress={onBlur} name="ios-close" /> : null}
              </Item>
            </Header>
            {focus ? (
              <SearchedProducts
                navigation={navigation}
                filteredProducts={filteredProducts}
              />
            ) : (
              <ScrollView>
                <View style={styles.container}>
                  <View style={{ flex: 1 }}>
                    <Banner />
                  </View>
                  <View>
                    <CategoryBanner
                      categories={categories}
                      changeCategory={changeCategory}
                      productsCategory={productsFilteredByCategory}
                      active={active}
                      setActive={setActive}
                    />
                  </View>
                  {productsFilteredByCategory.length > 0 ? (
                    <View style={styles.listContainer}>
                      {productsFilteredByCategory.map((product, index) => {
                        return (
                          <ProductList
                            key={index}
                            product={product}
                            navigation={navigation}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View style={[styles.center, { height: height / 3 }]}>
                      <Text>No products found.</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </Container>
      ) : (
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "gainsboro",
  },
});

export default ProductScreen;
