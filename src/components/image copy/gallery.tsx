import React, { memo, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
// import FastImage from "react-native-fast-image";
import { SliderBox } from "react-native-image-slider-box";
import { ApImageViewer } from "./viewer";

interface IProps {
  images: Array<any>;
  children?: any;
  autoplay?: boolean;
  circleLoop?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ApGallery: React.FC<IProps> = ({
  children,
  images,
  autoplay,
  circleLoop,
  containerStyle,
}) => {
  const [preview, setPreview] = useState<{
    show?: boolean;
    index?: number;
    images?: any;
  }>({});

  const [parentWidth, setParentWidth] = useState()

  const onLayout = (e) => {
    setParentWidth(e.nativeEvent.layout.width)
  }

  return (
    <>
      <View style={containerStyle} onLayout={onLayout}>
        {!!images.length && (
          <SliderBox
            parentWidth={parentWidth}
            ImageComponentStyle={{borderRadius: 20}}
            autoplay={autoplay}
            circleLoop={circleLoop}
            images={images.map((img) => img.uri)}
            resizeMode="cover"
            sliderBoxHeight={"100%"}
            dotColor="#28CDD8"
            inactiveDotColor="#90A4AE"
            paginationBoxStyle={{ width: "100%" }}
            // ImageComponent={FastImage}
            onCurrentImagePressed={(index) => {
              setPreview({
                ...preview,
                index,
                images: images.map((img) => ({ url: img.uri })),
                show: true,
              });
            }}
            dotStyle={{
              width: 15,
              height: 5,
              borderRadius: 3,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              marginRight: -10,
            }}
          />
        )}

        {children}
      </View>
      {preview.show && (
        <ApImageViewer
          index={preview.index}
          images={preview.images}
          onDismiss={() => {
            setPreview({ show: false });
          }}
        />
      )}
    </>
  );
};

export const MemoizeApGallery = memo(ApGallery);
