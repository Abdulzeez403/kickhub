import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

export const ProductCarousel = () => {
  return (
    <View className="bg-yellow-500 flex-row justify-between rounded-lg px-10 py-4 relative my-4">
      <View>
        <Text className="font-bold text-white" style={{ fontSize: 28 }}>
          SUPER DEAL
        </Text>
        <Text className="font-bold text-lg">30% Discount</Text>
        <View>
          <TouchableOpacity className="bg-black rounded-lg mt-2 w-32">
            <Text className="text-white text-center  py-1 ">Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute right-[-20px] top-[-25px] w-48 h-48">
        <Image
          source={require("../../../../assets/images/kickhubProducts/11.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};
