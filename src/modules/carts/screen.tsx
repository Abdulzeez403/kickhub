import React, { useMemo } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import ApHeader from "@/src/components/header";
import CartCard from "./omponents/cartCard";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { router } from "expo-router";

const CartScreen: React.FC = () => {
  const cartItems = [
    {
      id: "1",
      title: "Sneakers",
      image: require("../../../assets/images/kickhubProducts/Green 1.png"),
      price: "59.99",
      quantity: 1,
    },
    {
      id: "2",
      title: "Jacket",
      image: require("../../../assets/images/kickhubProducts/toppng.png"),
      price: "89.99",
      quantity: 2,
    },
  ];

  const handleRemove = (id: string) => {
    console.log(`Remove item with id: ${id}`);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    console.log(`Item id: ${id}, new quantity: ${newQuantity}`);
  };

  const cartCount = cartItems.length;
  const totalPrice = useMemo(() => {
    return cartItems
      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  }, [cartItems]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 0,
        backgroundColor: "white",
      }}
    >
      <ApHeader title="Carts" rightIcon="cart" cartCount={cartCount} />

      <SwipeListView
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartCard item={item} onQuantityChange={handleQuantityChange} />
        )}
        renderHiddenItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              backgroundColor: "red",
              height: 119,
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 15,
              borderRadius: 10,
              paddingBottom: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => handleRemove(item.id)}
              className="rounded-lg"
            >
              <Ionicons name="trash" color="white" size={42} />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75} // adjust the swipe width
        disableRightSwipe
      />

      {/* Checkout Section */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          padding: 16,
          borderTopWidth: 1,
          borderColor: "gray",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Total: ${totalPrice}
          </Text>
          <Button
            mode="contained"
            icon="cart"
            onPress={() => router.navigate("/checkout")}
            style={{
              backgroundColor: "black",
              paddingVertical: 4,
            }}
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{ color: "white", fontSize: 16 }}
          >
            Checkout
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
