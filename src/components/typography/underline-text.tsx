import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IProps {
  text: string;
  underlineColor: string;
  underlineHeight: number;
  underlineWidth: string;
  fontSize?: number;
  className?: string;
  containterClassName?: string;
}

const APUnderlinedText: React.FC<IProps> = ({
  text,
  underlineColor = "black",
  underlineHeight = 2,
  underlineWidth = "100%",
  fontSize = 20,
  className,
  containterClassName,
}) => {
  return (
    <View style={styles.container} className={containterClassName}>
      <Text
        className={`${className} font-msemibold"`}
        style={[styles.text, { fontSize } as any]}
      >
        {text}
      </Text>
      <View
        style={[
          styles.underline,
          {
            backgroundColor: underlineColor,
            height: underlineHeight,
            width: underlineWidth,
          } as any,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
  },
  underline: {
    marginTop: 5,
  },
});

export default APUnderlinedText;
