import React from "react";
import { StyleSheet } from "react-native";
import { Text, Badge } from "native-base";

import { connect } from "react-redux";
import COLORS from "../consts/colors";

const CardCount = ({ cards }) => {
  return (
    <>
      {cards.length > 0 ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{cards.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cards } = state;
  return {
    cards: cards,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: "absolute",
    justifyContent: "center",
    flex: 1,
    top: -4,
    right: -15,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(CardCount);
