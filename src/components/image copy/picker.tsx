import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ApUploadIcon from "../../../assets/icons/upload-icon";
import { ApTheme } from "../../theme";
import { ApIcon } from "../icon";
import { ApPopover } from "../popover";
import { ApText } from "../typography";
import { ReactNativeFile } from "apollo-upload-client";
type LunchType = "library" | "camera";

interface IImage {
  base64: string;
  fileName: string;
  filetype: string;
}

interface IProps {
  label: string;
  preview?: string;
  lanchType: LunchType[];
  icon?: React.ReactNode;
  skipPopover?: boolean;
  containerClassName?: string | undefined;
  onUpload?: (image: IImage[]) => void;
}

export const ApImagePicker: React.FC<IProps> = ({
  label,
  lanchType,
  onUpload,
  preview,
  icon,
  skipPopover,
  containerClassName,
}) => {
  const [base64, setBase64] = useState(preview || "");
  const [libPermissionStatus, reqLibPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [modal, setModal] = useState<{ show: boolean }>({
    show: false,
  });

  const [camPermissionStatus, reqCampermission] =
    ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (!libPermissionStatus?.granted) {
      reqLibPermission();
    }
    if (!camPermissionStatus?.granted) {
      reqCampermission();
    }
  }, []);

  useEffect(() => {
    setBase64(preview || "");
  }, [preview]);

  const libraryPicker = async () => {
    setModal({ show: false });
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      await handleSelected(result);
    }
  };

  const camShot = async () => {
    setModal({ show: false });
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      await handleSelected(result);
    }
  };

  const handleSelected = async (result: any) => {
    if (!!result?.assets?.length) {
      const fls = [];
      for await (const asset of result.assets) {
        const uri = asset.uri;
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (fileInfo?.exists) {
          const fileName = uri.split("/").pop();

          fls.push({
            ...asset,
            file: new ReactNativeFile({
              uri: uri,
              name: fileName,
              type: asset.mimeType,
            }),
          });
        }

        onUpload && onUpload(fls as any);
        setBase64(fls?.length ? fls[0]?.base64 : "");
      }
    }
  };

  const handleSelection = () => {
    if (lanchType && lanchType.length === 1) {
      switch (lanchType[0]) {
        case "library":
          libraryPicker();
          return;
        case "camera":
          camShot();
          return;
      }
    } else {
      setModal({ show: true });
    }
  };

  const PopoverContent = () => {
    return (
      <View style={styles.kycContainer}>
        <TouchableOpacity style={styles.kycIcon} onPress={libraryPicker}>
          <ApIcon name="photo-library" size={38} />
          <ApText>Library</ApText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.kycIcon} onPress={camShot}>
          <ApIcon type="AntDesign" name="camerao" size={38} />
          <ApText>Camera</ApText>
        </TouchableOpacity>
      </View>
    );
  };

  if (skipPopover) {
    return <PopoverContent />;
  }

  return (
    <ApPopover
      visible={modal.show}
      onDismiss={() => setModal({ show: false })}
      content={<PopoverContent />}
    >
      <TouchableOpacity
        onPress={handleSelection}
        className={` p-2 ${containerClassName}`}
      >
        <ImageBackground
          style={styles.image}
          source={{ uri: `data:image/png;base64,${base64}` }}
        >
          <View style={styles.content}>
            <View style={styles.icon}>
              {icon === null ? null : <ApUploadIcon />}
            </View>
            <ApText size="sm" style={styles.text}>
              {label}
            </ApText>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </ApPopover>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    resizeMode: "cover", // Adjust the resizeMode as per your requirement
    // Other styles for your image background
  },
  scanInterface: {
    alignSelf: "center",
  },
  scanImage: {
    width: "92%",
  },
  content: {
    margin: "auto",
    alignSelf: "center",
  },

  selection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kycContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // padding: 5,
  },
  kycIcon: {
    width: 100,
    height: 100,
    borderColor: ApTheme.Color.border,
    borderWidth: 2,
    margin: 5,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
