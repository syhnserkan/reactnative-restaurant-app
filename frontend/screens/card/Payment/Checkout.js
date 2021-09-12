import React, { useState, useEffect } from "react";
import { Text, Button, View } from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";

const countries = require("../../../data/countries.json");

const Checkout = ({ cards, navigation }) => {
  console.log("cards", cards);
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(cards);
    return () => {
      setOrderItems();
    };
  }, []);

  const checkout = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderFoods: orderItems,
      phone,
      addressLine1: address,
      addressLine2: address2,
      zip,
      user: "60c1d289a944323d54511b5a",
    };
    navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <Form title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"addressLine1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"addressLine2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            style={{ width: "100%", height: 50 }}
            selectedValue={country}
            placeholder="Select your country"
            placeholderStyle={{ color: "#007aff" }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((country, index) => {
              return (
                <Item key={index} label={country.name} value={country.name} />
              );
            })}
          </Picker>
        </Item>
        <View style={{ width: "80%", alignItems: "center", marginTop: 10 }}>
          <Button title="Confirm" onPress={() => checkout()} />
        </View>
      </Form>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cards } = state;
  return {
    cards: cards,
  };
};

export default connect(mapStateToProps)(Checkout);
