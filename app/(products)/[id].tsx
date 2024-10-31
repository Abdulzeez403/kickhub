import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import ApHeader from "@/src/components/header";
import { ApIcon } from "@/src/components/icon";

type ProductDetailParams = {
  id: string;
};

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  images: any[]; // Array of images
};

const StarRating = ({ rating }: { rating: number }) => (
  <View style={{ flexDirection: "row" }}>
    {Array.from({ length: 5 }).map((_, index) => (
      <FontAwesome
        key={index}
        name={index < rating ? "star" : "star-o"}
        size={20}
        color="orange"
      />
    ))}
  </View>
);

const ProductDetail = () => {
  const { id } = useLocalSearchParams<ProductDetailParams>();
  const [cartCount, setCartCount] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for selected size and color
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const product: Product = {
    id,
    title: "New Balance 550",
    price: "$29.99",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. This is a detailed description of the product. It includes all the features and specifications.",
    images: [
      require("../../assets/images/kickhubProducts/Green 1.png"),
      require("../../assets/images/kickhubProducts/Shoe 1.png"),
      require("../../assets/images/kickhubProducts/Shoe 1.png"),
    ],
  };

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Green"];

  const shortDescription =
    product.description.split(" ").slice(0, 30).join(" ") + " ...";

  const addToCart = () => setCartCount(cartCount + quantity);

  const renderImage = ({ item }: { item: any }) => (
    <Image
      source={item}
      style={{ width: "100%", height: 240, borderRadius: 10 }} // Adjust styles as needed
      resizeMode="contain"
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ApHeader
        title={product.title}
        rightIcon="cart"
        cartCount={cartCount}
        // onBack={() => router.push("/products")}
      />

      <ScrollView style={{ padding: 16, marginBottom: 80 }}>
        <View style={{ position: "relative" }}>
          <FlatList
            data={product.images}
            renderItem={renderImage}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width
              );
              setCurrentIndex(index);
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            {product.images.map((_, index) => (
              <View
                key={index}
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                  backgroundColor: index === currentIndex ? "black" : "gray",
                }}
              />
            ))}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#7F9C9F",
              marginBottom: 4,
            }}
          >
            Men's Shoe
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {product.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StarRating rating={4} />
              <Text>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>4.5</Text>{" "}
                (Reviews)
              </Text>
            </View>
            <Text style={{ color: "black", fontSize: 20 }}>
              {product.price}
            </Text>
          </View>

          <View style={{ alignItems: "center", position: "relative" }}>
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                marginBottom: 24,
                marginTop: 8,
              }}
            >
              {showFullDescription ? (
                product.description
              ) : (
                <>{shortDescription}</>
              )}
            </Text>
            <View style={{ position: "absolute", bottom: -2 }}>
              <Button
                mode="text"
                onPress={() => setShowFullDescription(!showFullDescription)}
                style={{ padding: 0 }}
              >
                {showFullDescription ? "Less" : "More"}
              </Button>
            </View>
          </View>

          {/* Size Selector */}
          <View style={{ marginVertical: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
              Select Size:
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor:
                      selectedSize === size ? "black" : "lightgray",
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      color: selectedSize === size ? "white" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selector */}
          <View style={{ marginVertical: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
              Select Color:
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor:
                      selectedColor === color ? "black" : "lightgray",
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      color: selectedColor === color ? "white" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 16,
          backgroundColor: "white",
          borderColor: "gray",
          borderTopWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            width: "100%",
          }}
        >
          <View>
            <ApIcon name="hearto" size={30} type="AntDesign" />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              mode="contained"
              onPress={addToCart}
              icon="cart"
              style={{
                backgroundColor: "black",
                paddingVertical: 4,
                width: "100%",
              }}
              contentStyle={{ flexDirection: "row-reverse" }}
              labelStyle={{ color: "white", fontSize: 16 }}
            >
              Add to Cart
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
