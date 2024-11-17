import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, FlatList, Alert } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import ApHeader from "@/src/components/header";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { placeOrder } from "@/src/redux/order/orderThunk";
import { Paystack } from "react-native-paystack-webview";
import { clearCart } from "@/src/redux/carts/cartSlice";
import { currentUser } from "@/src/redux/auth/auth";
import { router } from "expo-router";

const CheckoutScreen: React.FC = () => {
  const [showPaystack, setShowPaystack] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  // Fetch cart items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  const originalTotalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handlePlaceOrder = () => {
    setShowPaystack(true); // Show Paystack modal when user clicks "Place Order"
  };

  const handlePaymentSuccess = async (response: any) => {
    console.log("Payment Success:", response);

    try {
      // Dispatch the placeOrder action
      await dispatch(
        placeOrder({
          items: cartItems,
          totalAmount: parseFloat(originalTotalPrice),
          paymentStatus: "paid",
          status: "pending",
        })
      );

      // Dispatch the clearCart action
      await dispatch(clearCart());
      Alert.alert("Success", "Order placed successfully!");
      router.navigate("/home");
    } catch (error) {
      console.error("Order Placement Error:", error);
      Alert.alert("Error", "Failed to place order.");
    }

    setShowPaystack(false); // Hide Paystack modal
  };

  const handlePaymentCancel = () => {
    console.log("Payment Cancelled");
    setShowPaystack(false); // Hide Paystack modal
  };

  return (
    <PaperProvider>
      <SafeAreaView className="flex-1 p-4 bg-white">
        <ApHeader title="Checkout" cartCount={cartItems.length} />

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              <Text className="text-lg">{item.name}</Text>
              <Text className="text-lg font-bold">
                ${item.price * item.quantity}
              </Text>
            </View>
          )}
          ListFooterComponent={() => (
            <>
              <View className="flex-row justify-between py-2 mt-5">
                <Text className="text-xl font-bold">Total Amount:</Text>
                <Text className="text-xl font-bold text-gray-700">
                  ${originalTotalPrice}
                </Text>
              </View>
            </>
          )}
        />

        <View className="mt-10 px-4">
          <Button
            mode="contained"
            onPress={handlePlaceOrder}
            className="bg-black py-1"
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{ color: "white", fontSize: 16 }}
          >
            Place Order
          </Button>
        </View>

        {showPaystack && (
          <Paystack
            paystackKey="pk_test_2365c336f841503d63bd6c58f49a78e4d3d1409b"
            amount={parseFloat(originalTotalPrice) * 100}
            billingEmail={user?.email as any}
            billingName={user?.firstName}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
            autoStart={true}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default CheckoutScreen;
