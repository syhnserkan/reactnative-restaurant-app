import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

const { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerImages, setBannerImages] = useState([
    "https://image.freepik.com/free-psd/web-banner-template-japanese-restaurant_23-2148203260.jpg",
    "https://image.freepik.com/free-photo/tasty-pepperoni-pizza-black-concrete-background_79782-102.jpg",
    "https://image.freepik.com/free-vector/italian-food-banner-template_23-2149016171.jpg",
  ]);

  useEffect(() => {
    return () => {
      setBannerImages([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerImages.map((image) => {
              return (
                <Image
                  key={image}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: image }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;
