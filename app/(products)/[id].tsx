import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import ApHeader from "@/src/components/header";
import { ApIcon } from "@/src/components/icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { addToCart } from "@/src/redux/carts/cartSlice";
import { addToWishlist } from "@/src/redux/wishlist/wishlist";
import { fetchProductById } from "@/src/redux/product/products";
import { IImage } from "@/src/redux/product/type";
import Carousel from "react-native-reanimated-carousel";

type ProductDetailParams = {
  id: string;
};

const StarRating = ({ rating }: { rating: number }) => (
  <View className="flex-row">
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

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const width = Dimensions.get("window").width;
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { loading, error, product } = useSelector(
    (state: RootState) => state.products
  );
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.user);
  const handleCartPress = () => {
    isLoggedIn ? router.navigate("/carts") : router.navigate("/signup");
  };

  const scale = new Animated.Value(1);

  console.log(cartItems, "the carts...");

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["#FF0000", "#0000FF", "#008000"]; // Use hex codes for color swatches

  const shortDescription =
    product?.description?.split(" ").slice(0, 30).join(" ") + " ...";

  const handleAddToCart = () => {
    const payload = {
      ...product,
      quantity: 2,
      size: selectedSize,
      color: selectedColor,
    };
    dispatch(addToCart(payload as any));
    setCartCount(cartCount + quantity);

    Alert.alert("Cart Added");
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product as any));
  };

  // Handle the bounce effect when a new item is shown
  const handleSnap = (index: any) => {
    setCurrentIndex(index);
    // Bounce animation
    scale.setValue(1); // Reset scale
    Animated.spring(scale, {
      toValue: 1.2, // Make image bounce (scale up)
      friction: 3, // Bouncing effect intensity
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1, // Reset back to normal size
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderImage = ({ item }: { item: IImage }) => (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Image
        source={{ uri: item?.uri }}
        className="w-full h-60 rounded-lg"
        resizeMode="contain"
      />
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ApHeader
        title={product?.name as any}
        onCartPress={handleCartPress}
        cartCount={cartItems?.length}
      />

      <ScrollView className="px-4 mb-20">
        <View className="relative">
          <Carousel
            width={width}
            height={width * 0.7}
            data={product?.images || []}
            renderItem={renderImage}
            scrollAnimationDuration={100}
            // mode="horizontal"
            onSnapToItem={handleSnap}
            loop
          />
          <View className="absolute bottom-0 left-0 right-0 flex-row justify-center mb-4">
            {product?.images.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index === currentIndex ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-2xl font-bold text-teal-800 mb-1">
            {product?.tag}
          </Text>
          <Text className="text-2xl font-bold">{product?.name}</Text>
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-center">
              <StarRating rating={4} />
              <Text className="ml-1 text-lg font-semibold">4.5 (Reviews)</Text>
            </View>
            <Text className="text-2xl font-semibold">${product?.price}</Text>
          </View>

          <Text className="text-gray-600 mt-3">
            {showFullDescription ? product?.description : shortDescription}
          </Text>
          <Button
            mode="text"
            onPress={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Less" : "More"}
          </Button>

          {/* Size Selector */}
          <View className="my-4">
            <Text className="text-lg font-bold mb-2">Select Size:</Text>
            <View className="flex-row flex-wrap">
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  className={`p-2 rounded-lg mr-2 mb-2 ${
                    selectedSize === size ? "bg-black" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`${
                      selectedSize === size ? "text-white" : "text-black"
                    } font-bold`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selector */}
          <View className="my-4">
            <Text className="text-lg font-bold mb-2">Select Color:</Text>
            <View className="flex-row flex-wrap">
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedColor(color)}
                  className={`p-2 rounded-full mr-2 mb-2 ${
                    selectedColor === color ? "border-2 border-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-300">
        <View className="flex-row items-center gap-4 w-full">
          <TouchableOpacity onPress={handleAddToWishlist}>
            <ApIcon name="hearto" size={30} type="AntDesign" />
          </TouchableOpacity>
          <View className="flex-1">
            <Button
              mode="contained"
              onPress={handleAddToCart}
              icon="cart"
              className="bg-black py-2"
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
