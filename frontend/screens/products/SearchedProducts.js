import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Left, Content, Text, ListItem, Body, Thumbnail } from "native-base";

const { width } = Dimensions.get("window");
const SearchedProducts = ({ filteredProducts, navigation }) => {
  return (
    <Content style={{ width: width }}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item, index) => (
          <ListItem
            onPress={() => {
              navigation.navigate("Food Detail", { item: item });
            }}
            key={index}
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.centerText}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  centerText: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default SearchedProducts;
