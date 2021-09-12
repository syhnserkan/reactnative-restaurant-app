import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//components
import Card from "../../screens/card/Card";
import PaymentNavigator from "./PaymentNavigator";
const Stack = createStackNavigator();

export default function CardNavigators() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Card"
        component={Card}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={PaymentNavigator}
        options={{
          title: "Checkout",
        }}
      />
    </Stack.Navigator>
  );
}
