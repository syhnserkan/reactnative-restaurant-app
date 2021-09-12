import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { Right, Left, Container, H1 } from "native-base";
import StyledButton from "../../components/StyledButton";
import Toast from "react-native-toast-message";
import * as actions from "../../store/action";
import { connect } from "react-redux";
import COLORS from "../../consts/colors";

const FoodDetail = (props) => {
  const item = props.route.params.item;
  const [food, setFood] = useState(item);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: food.image
                ? food.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.content}>
          <H1 style={styles.header}>{food.name}</H1>
          <View style={styles.description}>
            <Text style={styles.bigText}>Description : </Text>
            <Text>{food.description}</Text>
          </View>
        </View>
        {/* TODO : Description, rich description */}
      </ScrollView>
      <View style={styles.bottom}>
        <Left>
          <Text style={styles.foodPrice}>$ {food.price}</Text>
        </Left>
        <Right>
          <StyledButton
            medium
            primary
            onPress={() => {
              props.addFoodToCard(food),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${food.name} added to Cart`,
                  text2: "Go to your cart to complete order",
                });
            }}
          >
            <Text style={{ color: COLORS.white }}>Add Food</Text>
          </StyledButton>
        </Right>
      </View>
    </Container>
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
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: COLORS.white,
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    borderRadius: 25,
    height: 250,
  },
  content: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.light,
  },
  bigText: {
    fontSize: 17,
    fontFamily: "bold",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottom: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.white,
  },
  foodPrice: {
    fontSize: 24,
    margin: 20,
    color: COLORS.primary,
  },
});

export default connect(null, mapDispatchToProps)(FoodDetail);
