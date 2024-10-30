import React from "react";
import { View } from "react-native";
import { Appbar, Badge, IconButton } from "react-native-paper";

type HomeHeaderProps = {
  title: string;
  onSearchPress: () => void;
  onCartPress: () => void;
  cartItemCount: number;
};

const HomeHeader = ({
  title,
  onSearchPress,
  onCartPress,
  cartItemCount,
}: HomeHeaderProps) => {
  return (
    <Appbar.Header>
      {/* Logo / Title */}
      <Appbar.Content
        title={title}
        titleStyle={{
          fontWeight: "bold", // Makes the font bold
          fontSize: 22, // Sets the font size
          color: "#000", // Sets the text color (black in this case)
          letterSpacing: 1, // Optional: Adds spacing between letters
          lineHeight: 28, // Optional: Adjusts the line height for better spacing
        }}
      />

      {/* Search Icon */}
      <IconButton
        icon="magnify"
        onPress={onSearchPress}
        accessibilityLabel="Search"
      />

      {/* Cart Icon with Badge */}
      <View>
        <IconButton
          icon="cart"
          onPress={onCartPress}
          accessibilityLabel="Cart"
        />
        {cartItemCount > 0 && (
          <Badge
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "red",
            }}
            size={18}
          >
            {cartItemCount}
          </Badge>
        )}
      </View>
    </Appbar.Header>
  );
};

export default HomeHeader;
