import React from "react";
import { ProductList } from "./components/productList";
import { View } from "react-native";

const Homescreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ProductList />
    </View>
  );
};

export default Homescreen;
