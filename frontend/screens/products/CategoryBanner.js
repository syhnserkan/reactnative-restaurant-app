import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Badge, Text } from "native-base";
import COLORS from "../../consts/colors";

const CategoryBanner = ({ categories, changeCategory, active, setActive }) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <ListItem style={styles.resetItem}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            changeCategory("all"), setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "white" }}>All</Text>
          </Badge>
        </TouchableOpacity>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              changeCategory(item.id), setActive(categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                active == categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={{ color: COLORS.textColor }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resetItem: {
    margin: 0,
    padding: 0,
    borderRadius: 0,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: COLORS.primary,
  },
  inactive: {
    backgroundColor: COLORS.secondary,
  },
});

export default CategoryBanner;
