import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export const ApEmpty = ({
  imageSource,
  message,
}: {
  imageSource: any;
  message: string;
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageSource} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
});
