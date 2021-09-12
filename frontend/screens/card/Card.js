import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Container,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";

import AuthGlobal from "../../context/AuthGlobal";

import StyledButton from "../../components/StyledButton";

import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from "react-native-swipe-list-view";
import CardFood from "./CardFood";

import { connect } from "react-redux";
import * as actions from "../../store/action";

const { height, width } = Dimensions.get("window");

const Card = ({
  name,
  price,
  image,
  countInStock,
  cards,
  navigation,
  clearCard,
  deleteFromCard,
}) => {
  const context = useContext(AuthGlobal);
  const totalAmount = cards.reduce((acc, card) => acc + card.product.price, 0);
  return (
    <>
      {cards.length > 0 ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Foods</H1>
          <SwipeListView
            data={cards}
            renderItem={({ item }) => {
              return <CardFood key={Math.random()} item={item} />;
            }}
            renderHiddenItem={({ item }) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => deleteFromCard(item)}
                >
                  <Icon name="trash" color={"white"} size={28} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            stopLeftSwipe={75}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
          {/* {cards.map((card, index) => {
            return <CardFood key={index} card={card} />;
          })} */}
          <View style={styles.bottom}>
            <Left>
              <Text style={styles.price}>$ {totalAmount}</Text>
            </Left>
            <Right>
              <StyledButton large danger onPress={() => clearCard()}>
                <Text style={{ color: "white" }}>Clear Foods</Text>
              </StyledButton>
            </Right>
            <Right>
              {context.stateUser.isAuthenticated ? (
                <StyledButton
                  medium
                  primary
                  onPress={() => navigation.navigate("Checkout")}
                >
                  <Text style={{ color: "white" }}>Checkout</Text>
                </StyledButton>
              ) : (
                <StyledButton
                  medium
                  secondary
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={{ color: "white" }}>Login</Text>
                </StyledButton>
              )}
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.empty}>
          <Text>Your card is empty</Text>
          <Text>Add foods to your card to eat.</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cards } = state;
  return {
    cards: cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCard: () => dispatch(actions.clearCard()),
    deleteFromCard: (food) => dispatch(actions.deleteFromCard(food)),
  };
};

const styles = StyleSheet.create({
  empty: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    margin: 20,
    color: "red",
    fontSize: 18,
  },
  bottom: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 2,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 65,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
