// SearchBar.tsx
import { ApIcon } from "@/src/components/icon";
import React from "react";
import { View, TextInput } from "react-native";

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export const ApSearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchTextChange,
}) => {
  return (
    <View className="flex flex-row items-center bg-slate-200 rounded-lg my-2 px-4  rounded-full shadow-md">
      <ApIcon size={20} name="search" type="FontAwesome" color="#000" />

      <TextInput
        className="flex-1 h-10 ml-2 mr-2"
        placeholder="Search Product..."
        value={searchText}
        onChangeText={onSearchTextChange}
      />
      <ApIcon size={25} name="filter-circle" type="Ionicons" color="#000" />
    </View>
  );
};
