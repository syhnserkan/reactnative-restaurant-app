import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Products from "../../screens/admin/Products";
import Orders from "../../screens/admin/Orders";
import Categories from "../../screens/admin/Categories";
import FoodFormContainer from "../../screens/admin/FoodFormContainer";

const Stack = createStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: "Products",
        }}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="FoodFormContainer" component={FoodFormContainer} />
    </Stack.Navigator>
  );
}
