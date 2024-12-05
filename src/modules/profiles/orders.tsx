import { ApEmpty } from "@/src/components/empty";
import ApHeader from "@/src/components/header";
import { fetchUserOrders } from "@/src/redux/order/orderThunk";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useEffect } from "react";
import { View, Text, Image, FlatList, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const OrdersScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchUserOrders("67265fc6268e5a0d19fdcb22"));
  }, []);

  const renderOrderItem = ({ item }: { item: any }) => (
    <View className=" p-4 border-b border-gray-200 bg-white rounded-md mb-2 shadow-md">
      <View className="flex-row items-center justify-between">
        <Text className="font-bold">Kick1003</Text>
        <View className="flex-row gap-4 items-center">
          <Text className="text-gray-600 bg-yellow-300 px-2 py-1 rounded-lg">
            {item.status}
          </Text>
          <Text
            className={`text-gray-600 font-bold px-2 py-1 rounded-md  ${
              item.paymentStatus === "paid" ? "bg-green-300" : "bg-red-300"
            }`}
          >
            {item.paymentStatus}
          </Text>
        </View>
      </View>
      <View className="">
        <Text className="text-xl font-semibold">${item.totalAmount}</Text>
        <Text>Items:{item?.items?.length}</Text>
        <Text className="text-gray-500">
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ApHeader title="My Orders" />
      {orders?.length === 0 ? (
        <ApEmpty
          imageSource={require("../../../assets/images/kickhubProducts/emptyCart.png")}
          message="Your order is empty. Start shopping now!"
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item?._id}
          renderItem={renderOrderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
