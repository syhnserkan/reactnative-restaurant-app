import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Screens
import Payment from "../../screens/card/Payment/Payment";
import Checkout from "../../screens/card/Payment/Checkout";
import Confirm from "../../screens/card/Payment/Confirm";

const TopTab = createMaterialTopTabNavigator();

export default function PaymentNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Shipping" component={Checkout} />
      <TopTab.Screen name="Payment" component={Payment} />
      <TopTab.Screen name="Confirm" component={Confirm} />
    </TopTab.Navigator>
  );
}
