// src/components/Header.tsx
import React from "react";
import { Appbar, Badge } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: string;
  cartCount?: number;
}

const ApHeader: React.FC<HeaderProps> = ({
  title,
  onBack,
  rightIcon,
  cartCount,
}) => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={onBack || router.back} />
      <Appbar.Content
        className="flex-1 items-center text-center"
        title={title}
      />
      {rightIcon && (
        <View style={styles.iconContainer}>
          <Appbar.Action icon={rightIcon} onPress={() => {}} />
          {cartCount ? <Badge style={styles.badge}>{cartCount}</Badge> : null}
        </View>
      )}
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
