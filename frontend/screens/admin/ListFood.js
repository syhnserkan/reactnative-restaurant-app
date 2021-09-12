import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import StyledButton from "../../components/StyledButton";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const ListFood = (props) => {
  const {
    name,
    id,
    brand,
    image,
    category,
    price,
    navigation,
    index,
    deleteFood,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.centerModal}>
          <View style={styles.modal}>
            <TouchableOpacity
              underlayColor="#e8e8e8"
              onPress={() => {
                setIsModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <StyledButton
              medium
              secondary
              onPress={() => {
                navigation.navigate("FoodFormContainer", { item: props }),
                  setIsModalVisible(false);
              }}
            >
              <Text style={styles.text}>Edit</Text>
            </StyledButton>
            <StyledButton
              onPress={() => [deleteFood(id), setIsModalVisible(false)]}
              medium
              danger
            >
              <Text style={styles.text}>Delete</Text>
            </StyledButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: index % 2 == 0 ? "white" : "gainsboro" },
        ]}
        onPress={() => {
          navigation.navigate("Food Detail", { item: props });
        }}
        onLongPress={() => setIsModalVisible(true)}
      >
        <Image
          source={{
            uri: image
              ? image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.food} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.food} numberOfLines={1} ellipsizeMode="tail">
          {category.name}
        </Text>
        <Text style={styles.food}>$ {price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: width,
    padding: 6,
  },
  image: {
    width: width / 6,
    borderRadius: 50,
    height: 20,
    margin: 3,
  },
  food: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centerModal: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    margin: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.6,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 20,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ListFood;
