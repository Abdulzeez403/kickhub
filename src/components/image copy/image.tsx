import React, { useState } from "react";
import { Image, ImageContentFit, ImageSource, ImageStyle } from "expo-image";
// import ExpoFastImage from "expo-fast-image";
//import FastImage from "react-native-fast-image";
import { StyleProp } from "react-native";
// const blurhash =
//   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface IProps {
  source: string | ImageSource;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
  fast?: boolean;
}

export const ApImage: React.FC<IProps> = ({
  source,
  contentFit,
  fast,
  style,
}) => {
  if (!source) return null;

  // if (fast)
  //   return (
  //     <FastImage
  //       source={{
  //         uri: (source as any).uri || source,
  //         priority: FastImage.priority.normal,
  //       }} // image address
  //       // cacheKey={cacheKey} // could be a unque id
  //       style={[{ width: "100%" }, style as any]}
  //       // your custom style object
  //       // any supported props by Image
  //       resizeMode={FastImage.resizeMode[contentFit]}
  //     />
  //   );
  return (
    <Image
      style={[{ width: "100%" }, style as any]}
      source={source}
      // placeholder={blurhash}
      contentFit={contentFit || "contain"}
      cachePolicy="memory-disk"
    />
  );
};
