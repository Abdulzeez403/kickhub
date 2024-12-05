// src/components/Header.tsx
import React from "react";
import { Appbar, Badge, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onCartPress?: () => void;
  cartCount?: null | number;
}

const ApHeader: React.FC<HeaderProps> = ({
  title,
  onBack,
  onCartPress,
  cartCount,
}) => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={onBack || router.back} />
      <Appbar.Content
        className="flex-1 items-center text-center"
        title={title}
      />

      {/* Cart Icon with Badge */}
      <View>
        <IconButton
          icon="cart"
          onPress={onCartPress}
          accessibilityLabel="Cart"
        />
        {cartCount != null && cartCount > 0 && (
          <Badge
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "red",
            }}
            size={18}
          >
            {cartCount}
          </Badge>
        )}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "transparent",
    // elevation: 2,
    // width: "100%",
  },
  title: {
    textAlign: "center", // Center the title
    color: "#333", // Dark color for the title
    fontWeight: "bold", // Bold font for the title
  },
  iconContainer: {
    position: "relative", // Position relative for the badge
  },
  badge: {
    position: "absolute",
    left: -4,
    top: -2,
    backgroundColor: "red",
  },
});

export default ApHeader;
