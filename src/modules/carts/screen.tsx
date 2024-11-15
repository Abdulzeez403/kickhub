import React, { useMemo } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import ApHeader from "@/src/components/header";
import CartCard from "./omponents/cartCard";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { removeFromCart, updateQuantity } from "@/src/redux/carts/cartSlice";
import { ApEmpty } from "@/src/components/empty";

const CartScreen: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handleCartPress = () => {
    isLoggedIn ? router.navigate("/carts") : router.navigate("/signup");
  };
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (_id: string, newQuantity: number) => {
    dispatch(updateQuantity({ _id, quantity: newQuantity }));
  };

  const cartCount = cartItems.length;

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
      <ApHeader
        title="Carts"
        onCartPress={handleCartPress}
        cartCount={cartCount}
      />

      {cartItems.length == 0 ? (
        <ApEmpty
          imageSource={require("../../../assets/images/kickhubProducts/emptyCart.png")}
          message="Your cart is empty. Start shopping now!"
        />
      ) : (
        <>
          <SwipeListView
            data={cartItems}
            keyExtractor={(item) => item._id}
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
                  onPress={() => handleRemove(item?._id)}
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
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
