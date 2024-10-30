import React, { useState } from "react";
import { ApPopover } from "../popover";
import { TouchableOpacity, View } from "react-native";
import { ApText } from "../typography";
import { ApWebview } from "../container";
import { ApIcon } from "../icon";

interface IProps {
  label: string;
  uri: string;
  className?: string | undefined;
  contentClassName?: string | undefined;
}

export const ApImagePopview: React.FC<IProps> = ({
  label,
  uri,
  className,
  contentClassName,
}) => {
  const [modal, setModal] = useState<{ show: boolean }>({
    show: false,
  });

  return (
    <ApPopover
      visible={modal.show}
      content={
        <>
          <View className="flex  items-end">
            <ApIcon name="close" onPress={() => setModal({ show: false })} />
          </View>

          <ApWebview style={{ width: 500, height: 500 }} source={{ uri }} />
        </>
      }
    >
      <TouchableOpacity
        onPress={() => {
          setModal({ show: !modal.show });
        }}
        className={` rounded-sm p-3 border border-dotted border-divider ${className}`}
      >
        <ApText className="text-dark ">{label}</ApText>
      </TouchableOpacity>
    </ApPopover>
  );
};
