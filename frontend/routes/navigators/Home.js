import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../../screens/products/ProductsScreen";
import FoodDetail from "../../screens/products/FoodDetail";

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Food Detail"
        component={FoodDetail}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
