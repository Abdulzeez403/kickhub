import ImageViewer from "react-native-image-zoom-viewer";

import React from "react";
import { Modal } from "react-native";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";
import { ApIcon } from "../icon";
import { ApSafeAreaView } from "../container";
import { ApTheme } from "../../theme";

interface IProps {
  index?: number;
  images: IImageInfo[];
  onDismiss?: () => void;
}

export const ApImageViewer: React.FC<IProps> = ({
  images,
  index,
  onDismiss,
}) => {
  return (
    <Modal visible={true} transparent={true}>
      <ApSafeAreaView />

      <ImageViewer
        enableSwipeDown
        renderHeader={() => (
          <>
            <ApIcon
              name="close"
              size={25}
              onPress={() => {
                onDismiss && onDismiss();
              }}
              color={ApTheme.Color.primary}
              style={{
                position: "absolute",
                margin: 15,
                marginBottom: -150,
                right: 0,
                top: 0,
                zIndex:9999
              }}
            />
          </>
        )}
        onSwipeDown={() => {
          onDismiss && onDismiss();
        }}
        imageUrls={images}
        index={index}
        onCancel={onDismiss}
        
      />
    </Modal>
  );
};
