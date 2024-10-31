import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CartCardProps = {
  item: {
    id: string;
    title: string;
    image: any;
    price: string;
    quantity: number;
  };
  onQuantityChange: (id: string, newQuantity: number) => void;
};

const CartCard: React.FC<CartCardProps> = ({ item, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <View className="flex-1 flex-row  justify-between items-center bg-slate-200 rounded-lg shadow-sm p-2 mb-2">
      <View className="flex-row ">
        <Image source={item.image} className="w-20 h-20 rounded-lg mr-4" />
        <View>
          <Text className="text-lg font-bold">{item.title}</Text>
          <Text className="text-sm">Men's Shop</Text>
          <Text className="text-gray-600 mt-1">${item.price}</Text>
        </View>
      </View>

      <View className="flex-col  mt-2">
        <TouchableOpacity
          onPress={handleDecrease}
          className="p-2 bg-white rounded-full mr-2"
        >
          <Ionicons name="remove" size={16} color="#333" />
        </TouchableOpacity>

        <Text className=" text-lg font-semibold text-center">{quantity}</Text>

        <TouchableOpacity
          onPress={handleIncrease}
          className="p-2 bg-white rounded-full mr-2"
        >
          <Ionicons name="add" size={16} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;