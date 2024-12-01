import { ApEmpty } from "@/src/components/empty";
import ApHeader from "@/src/components/header";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const WishlistScreen: React.FC = () => {
  const [listData, setListData] = useState([]);

  const handleDelete = (id: string) => {
    setListData(listData.filter((item: any) => item.id !== id));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row items-center p-4 bg-gray-200 mb-2 rounded-lg shadow-sm">
      <View className="">
        <Image source={item.image} className="w-14 h-14 rounded-lg mr-4" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-sm">Men's Shoes</Text>
        <Text className="font-bold">$ {item.price}</Text>
      </View>
    </View>
  );

  const renderHiddenItem = ({ item }: { item: any }) => (
    <View className="rounded-lg bg-red-400">
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        className="bg-red-400 justify-center items-center w-20 py-7 absolute right-0 rounded-lg"
      >
        <Ionicons name="trash" color="white" size={42} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 0,
        backgroundColor: "white",
      }}
    >
      {/* <View className=" bg-white px-4"> */}
      <ApHeader title="WishLists" cartCount={4} />

      {listData.length == 0 ? (
        <ApEmpty
          imageSource={require("../../../assets/images/kickhubProducts/emptyCart.png")}
          message="Your wishlist is empty"
        />
      ) : (
        <SwipeListView
          data={listData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
        />
      )}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default WishlistScreen;
