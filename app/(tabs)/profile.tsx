import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfileScreen: React.FC = () => {
  const router = useRouter();

  const handleWishlist = () => {
    router.push("/wishlist");
  };

  const handleSettings = () => {
    router.push("/(profile)/setting");
  };

  const handleOrders = () => {
    router.push("/(profile)/order");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="items-center mb-6 mt-6">
        <Image
          source={{ uri: "https://placekitten.com/200/200" }} // Replace with actual user image URL
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-lg font-bold">Abdulazeez Sdoiq</Text>
        <Text className="text-gray-500">AbdulazeezSdoiq@gmail.com</Text>
      </View>

      {/* Quick Actions */}
      <View className="flex-row justify-around mb-6">
        <TouchableOpacity onPress={handleWishlist} className="items-center">
          <Ionicons name="heart-outline" size={24} color="black" />
          <Text className="text-sm">Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOrders} className="items-center">
          <Ionicons name="cube-outline" size={24} color="black" />
          <Text className="text-sm">Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSettings} className="items-center">
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text className="text-sm">Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Orders Shortcut */}
      <TouchableOpacity
        onPress={handleOrders}
        className="mt-6 p-4 bg-gray-200 rounded-md shadow-sm"
      >
        <Text className="text-lg font-semibold text-center text-gray-700">
          View Full Order History
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
