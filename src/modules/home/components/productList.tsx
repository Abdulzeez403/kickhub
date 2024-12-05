import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ApIcon } from "@/src/components/icon";
import { Link, router } from "expo-router";
import { ProductCarousel } from "./carousel";
import HomeHeader from "./homeHeader";
import { currentUser } from "@/src/redux/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { IProduct } from "@/src/redux/product/type";
import { fetchProducts } from "@/src/redux/product/products";
import { ActivityIndicator } from "react-native-paper";

export const ProductList = () => {
  const {
    loading,
    error,
    items: Products,
  } = useSelector((state: RootState) => state.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [filteredData, setFilteredData] = useState(Products);
  const [searchText, setSearchText] = useState("");
  const categories = ["All", "Sneaker", "Sport", "Formal", "Adidas", "Another"];
  const [activeCategory, setActiveCategory] = useState("All");

  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.user);
  useEffect(() => {
    dispatch(currentUser());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Function to filter sneakers based on category and search text
  const handleFilterPress = (category: string) => {
    setActiveCategory(category);
    filterData(category, searchText);
  };

  const filterData = (category: string, search: string) => {
    let data: IProduct[] = Products;

    // Filter by category
    if (category !== "All") {
      data = data.filter((item: any) =>
        item.name.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by search text
    if (search) {
      data = data.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(data as any);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterData(activeCategory, text);
  };

  const handleSearchPress = () => {
    console.log("Search pressed");
    router.navigate("/signin");
  };

  const handleCartPress = () => {
    isLoggedIn ? router.navigate("/carts") : router.navigate("/signup");
  };

  const renderSneakerItem = ({ item }: { item: IProduct }) => (
    <TouchableOpacity className="bg-white rounded-lg shadow-md my-2 flex-1 mx-1 gap-x-2 relative bg-slate-200 mx-2">
      <View>
        <Image
          source={{ uri: item.images[0].uri as any }}
          className="w-full h-40 rounded-lg"
        />
        <View className="absolute   p-2">
          <ApIcon size={25} name="hearto" type="AntDesign" color="#000" />
        </View>

        <Text className="font-bold text-lg mt-2">{item.name}</Text>
        <Text className="">{item.tag}</Text>
        <View className="flex-row justify-between px-2">
          <Text className=" text-xl font-extrabold text-gray-800 mt-2">
            $ {item.price}
          </Text>
          <View className="bg-white p-2 m-2 rounded-lg">
            <Link href={`/(products)/${item?._id}`}>
              <ApIcon
                size={14}
                name="arrowright"
                type="AntDesign"
                color="#000"
              />
            </Link>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => {
    const orderedCategories = [
      activeCategory,
      ...categories.filter((cat) => cat !== activeCategory),
    ];

    return (
      <View className="bg-white">
        {/* <ApSearchBar
          searchText={searchText}
          onSearchTextChange={handleSearch}
        /> */}

        <HomeHeader
          title="KickHub"
          onSearchPress={handleSearchPress}
          onCartPress={handleCartPress}
          cartItemCount={cartItems?.length}
        />

        <View>
          <ProductCarousel />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-2 rounded"
        >
          {orderedCategories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleFilterPress(category)}
              className={`p-2 mx-1 rounded-full ${
                activeCategory === category ? "bg-black" : "bg-white"
              }`}
            >
              <Text
                className={`text-md ${
                  activeCategory === category ? "text-white" : "text-black"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={filteredData}
        renderItem={renderSneakerItem}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={{ padding: 2 }}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          !loading ? (
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-gray-500 text-lg text-center">
                No products found.
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          loading ? (
            <View className="py-4">
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : null
        }
      />
    </View>
  );
};
