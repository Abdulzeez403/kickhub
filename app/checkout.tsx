import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
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

const CheckoutScreen: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const savedAddresses = [
    { id: "1", label: "Home - 123 Main St" },
    { id: "2", label: "Office - 456 Market St" },
    { id: "3", label: "Parents - 789 Elm St" },
  ];

  const cartItems = [
    { id: "1", title: "Sneakers", price: "59.99", quantity: 1 },
    { id: "2", title: "Jacket", price: "89.99", quantity: 2 },
  ];

  const originalTotalPrice = cartItems
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2) as any;

  const discountedPrice = discountApplied
    ? (originalTotalPrice * 0.9).toFixed(2)
    : originalTotalPrice;

  const handleApplyDiscount = () => {
    if (discountCode === "SAVE10") {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  };

  const handlePayment = () => {
    console.log("Proceeding to payment");
  };

  const toggleAddressModal = () => setAddressModalVisible(!addressModalVisible);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ApHeader title="Checkout" />

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>
                ${item.price} x {item.quantity}
              </Text>
            </View>
          )}
          ListFooterComponent={() => (
            <>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Amount:</Text>
                <Text style={styles.totalPrice}>${discountedPrice}</Text>
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Shipping Address</Text>
                <Button onPress={toggleAddressModal}>
                  {selectedAddress || "Select Address"}
                </Button>
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Discount Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChangeText={setDiscountCode}
                />
                <Button
                  onPress={handleApplyDiscount}
                  style={styles.applyDiscountButton}
                >
                  Apply Discount
                </Button>
              </View>
            </>
          )}
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handlePayment}
            style={{
              backgroundColor: "black",
              paddingVertical: 4,
            }}
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{ color: "white", fontSize: 16 }}
          >
            Proceed to Payment
          </Button>
        </View>

        <Portal>
          <Modal
            visible={addressModalVisible}
            onDismiss={toggleAddressModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Select Shipping Address</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemTitle: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  applyDiscountButton: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default CheckoutScreen;
