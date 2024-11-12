import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import {
  Button,
  Modal,
  Portal,
  List,
  RadioButton,
  PaperProvider,
} from "react-native-paper";
import ApHeader from "@/src/components/header";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { placeOrder } from "@/src/redux/order/orderThunk";

const CheckoutScreen: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const savedAddresses = [
    { id: "1", label: "Home - 123 Main St" },
    { id: "2", label: "Office - 456 Market St" },
    { id: "3", label: "Parents - 789 Elm St" },
  ];

  // Fetch cart items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const originalTotalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const discountedPrice = discountApplied
    ? (parseFloat(originalTotalPrice) * 0.9).toFixed(2)
    : originalTotalPrice;

  const handleApplyDiscount = () => {
    if (discountCode === "SAVE10") {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      Alert.alert("Address Required", "Please select a shipping address.");
      return;
    }

    try {
      dispatch(
        placeOrder({
          items: cartItems,
          totalAmount: parseFloat(discountedPrice),
          paymentStatus: "unpaid",
          status: "pending",
        })
      );
    } catch (error) {
      console.error("Order Placement Error:", error);
    }
  };

  const toggleAddressModal = () => setAddressModalVisible(!addressModalVisible);

  return (
    <PaperProvider>
      <SafeAreaView className="flex-1 p-4 bg-white">
        <ApHeader title="Checkout" cartCount={cartItems.length} />

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
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
                  ${discountedPrice}
                </Text>
              </View>
              {/* 
              <View className="mt-5">
                <Text className="text-lg font-bold mb-2">Shipping Address</Text>
                <Button onPress={toggleAddressModal}>
                  {selectedAddress || "Select Address"}
                </Button>
              </View> */}

              {/* <View className="mt-5">
                <Text className="text-lg font-bold mb-2">Discount Code</Text>
                <TextInput
                  className="border border-gray-300 rounded p-2 text-lg"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChangeText={setDiscountCode}
                />
                <Button onPress={handleApplyDiscount} className="mt-3">
                  Apply Discount
                </Button>
              </View> */}
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

        <Portal>
          <Modal
            visible={addressModalVisible}
            onDismiss={toggleAddressModal}
            contentContainerStyle={{
              padding: 20,
              marginHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text className="text-xl font-bold mb-4 text-center">
              Select Shipping Address
            </Text>
            <RadioButton.Group
              onValueChange={(value) => setSelectedAddress(value)}
              value={selectedAddress}
            >
              {savedAddresses.map((address) => (
                <List.Item
                  key={address.id}
                  title={address.label}
                  left={() => <RadioButton value={address.label} />}
                  onPress={() => setSelectedAddress(address.label)}
                />
              ))}
            </RadioButton.Group>
            <Button mode="contained" onPress={toggleAddressModal}>
              Confirm Address
            </Button>
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default CheckoutScreen;
