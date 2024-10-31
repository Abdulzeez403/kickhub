import React from "react";
import { ProductList } from "./components/productList";
import { View } from "react-native";

const Homescreen = () => {
  return (
    <View className="flex-1 p-2 pt-0">
      <ProductList />
    </View>
  );
};

export default Homescreen;
