import { Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";
import ApHeader from "@/src/components/header";

type ProductDetailParams = {
  id: string;
};

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  image: any; // Adjust based on actual image type
};

type Color = "red" | "blue" | "green" | "black" | "white";
type Size = "S" | "M" | "L" | "XL" | "XXL";

const ColorSelector = ({ colors }: { colors: Color[] }) => {
  const colorClassMap: Record<Color, string> = {
    red: "bg-red-300",
    blue: "bg-blue-300",
    green: "bg-green-300",
    black: "bg-gray-800",
    white: "bg-gray-200",
  };

  return (
    <View className="w-1/1 space-y-2">
      <Text className="text-lg font-bold mb-2">Colors</Text>
      {colors.map((color, index) => (
        <View
          key={index}
          className={`${colorClassMap[color]} w-10 h-10 border border-black rounded-md`}
        />
      ))}
    </View>
  );
};

const SizeSelector = ({ sizes }: { sizes: Size[] }) => (
  <View className="w-1/1 space-y-2">
    <Text className="text-lg font-bold mb-2">Sizes</Text>
    {sizes.map((size, index) => (
      <Text
        key={index}
        className="text-center py-2 border border-gray-300 rounded-md"
      >
        {size}
      </Text>
    ))}
  </View>
);

const ProductDetail = () => {
  const { id } = useLocalSearchParams<ProductDetailParams>();
  const [cartCount, setCartCount] = useState(5);

  const product: Product = {
    id,
    title: "Sample Product Title",
    price: "$29.99",
    description:
      "This is a detailed description of the product. It includes all the features and specifications.",
    image: require("../../../assets/images/kickhubProducts/11.png"),
  };

  const sizes: Size[] = ["S", "M", "L", "XL", "XXL"];
  const colors: Color[] = ["red", "blue", "green", "black", "white"];

  const _goBack = () => {
    // Handle back navigation
  };

  const addToCart = () => setCartCount(cartCount + 1);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ApHeader
        title={product.title}
        onBack={_goBack}
        rightIcon="cart"
        cartCount={cartCount}
      />
      <ScrollView className="p-4 mb-20">
        <View className="flex-row justify-between items-center">
          <SizeSelector sizes={sizes} />
          <Image source={product.image} className="w-1/2 h-48 rounded-lg " />
          <ColorSelector colors={colors} />
        </View>

        {/* Product Details */}
        <View className="mt-6">
          <Text className="text-2xl font-bold mb-2">{product.title}</Text>
          <Text className="text-xl text-green-600 mb-4">{product.price}</Text>
          <Text className="text-base text-gray-600 mb-6">
            {product.description}
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <View className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-300">
        <Button
          mode="contained"
          onPress={addToCart}
          style={{ backgroundColor: "green", paddingVertical: 10 }}
          labelStyle={{ color: "white", fontSize: 16 }}
        >
          Add to Cart
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
