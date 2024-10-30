import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Sneakers } from "@/constants/data"; // Adjust the path as needed
import { ApIcon } from "@/src/components/icon";
import { Link } from "expo-router";
import { ApSearchBar } from "../home/components/searchBar";

export const ProductListScreen = () => {
  const [filteredData, setFilteredData] = useState(Sneakers);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const categories = ["All", "Sneaker", "Sport", "Formal", "Adidas", "Another"];

  // Function to filter sneakers based on category and search text
  const handleFilterPress = (category: string) => {
    setActiveCategory(category);
    filterData(category, searchText);
  };

  const filterData = (category: string, search: string) => {
    let data = Sneakers;

    // Filter by category
    if (category !== "All") {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by search text
    if (search) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(data);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterData(activeCategory, text);
  };

  const renderSneakerItem = ({
    item,
  }: {
    item: { id: number; title: string; price: number; image: any };
  }) => (
    <TouchableOpacity className="bg-white rounded-lg shadow-md my-2 flex-1 mx-1 gap-x-2 relative">
      <View>
        <Image source={item.image} className="w-full h-40 rounded-lg" />
        <View className="absolute   p-2">
          <ApIcon size={25} name="hearto" type="AntDesign" color="#000" />
        </View>

        <Text className="font-bold text-lg mt-2">{item.title}</Text>
        <View className="flex-row justify-between px-2">
          <Text className=" mt-1 font-bold">${item.price}</Text>
          <View className="bg-slate-300 p-2">
            <Link href={`/products/${item.id}`}>
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
      <View className="py-2">
        <ApSearchBar
          searchText={searchText}
          onSearchTextChange={handleSearch}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="p-2 rounded"
        >
          {orderedCategories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleFilterPress(category)}
              className={`p-2 mx-1 rounded ${
                activeCategory === category ? "bg-black" : "bg-white"
              }`}
            >
              <Text
                className={`text-lg ${
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
    <FlatList
      data={filteredData}
      renderItem={renderSneakerItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 2 }}
      numColumns={2}
      ListHeaderComponent={renderHeader}
    />
  );
};
