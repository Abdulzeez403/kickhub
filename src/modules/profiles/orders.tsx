// src/screens/OrdersScreen.tsx
import ApHeader from "@/src/components/header";
import React from "react";
import { View, Text, Image, FlatList, SafeAreaView } from "react-native";

const orderHistory = [
  {
    id: "1",
    image: "https://placekitten.com/100/100",
    title: "Nike Air Max",
    date: "10/12/2023",
    price: "$120",
    status: "Delivered",
  },
  {
    id: "2",
    image: "https://placekitten.com/100/100",
    title: "Adidas Yeezy Boost",
    date: "08/05/2023",
    price: "$220",
    status: "Shipped",
  },
  // Add more orders here
];

const OrdersScreen: React.FC = () => {
  const renderOrderItem = ({ item }: { item: any }) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200 bg-white rounded-md mb-2 shadow-md">
      <Image source={{ uri: item.image }} className="w-16 h-16 rounded" />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold">{item.title}</Text>
        <Text className="text-gray-500">{item.date}</Text>
        <Text className="text-gray-600">{item.status}</Text>
      </View>
      <Text className="text-gray-900 font-bold">{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">
      <ApHeader title="My Orders" />
      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;
