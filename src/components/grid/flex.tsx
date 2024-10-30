import React from "react";
import {
  FlexAlignType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface IProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  gap?: number;
  direction?: "row" | "column";
  align?: FlexAlignType;
  wrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  className?: string | undefined;
}

export const ApFlex: React.FC<IProps> = ({
  children,
  style,
  gap,
  className,
  wrap = "nowrap",
  justify = "space-between",
  direction = "row",
  align = "flex-start",
}) => {
  return (
    <View
      style={[
        styles.row,
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          gap,
          flexWrap: wrap,
        },
        style,
      ]}
      className={className}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
});
