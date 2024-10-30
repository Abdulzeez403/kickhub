import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Tabs, useNavigation } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; // Import FontAwesome icons
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icons
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"; // Import for tab bar props type

// Custom Tab Bar component with rounded active button styling
const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View
      style={{ flexDirection: "row", backgroundColor: "#f0f0f0", padding: 10 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        // Determine the icon name and library based on the route name
        let IconComponent;
        let iconName;

        switch (route.name) {
          case "home":
            IconComponent = Ionicons;
            iconName = "home-outline";
            break;
          case "products":
            IconComponent = AntDesign;
            iconName = "inbox"; // AntDesign icon
            break;
          case "orders":
            IconComponent = AntDesign;
            iconName = "shoppingcart"; // AntDesign icon for orders
            break;
          case "profile":
            IconComponent = AntDesign;
            iconName = "user"; // FontAwesome icon
            break;
          default:
            IconComponent = Ionicons;
            iconName = "home-outline";
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 6,
              backgroundColor: isFocused ? "black" : "transparent", // Black when active
              borderRadius: isFocused ? 50 : 0, // Fully rounded when active
            }}
          >
            <IconComponent
              name={iconName as any}
              size={20}
              color={isFocused ? "white" : "black"} // White for active icon
            />
            <Text
              style={{ color: isFocused ? "white" : "black", fontSize: 12 }}
            >
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Main Tab Layout component
const TabLayout: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="inbox" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Order",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
