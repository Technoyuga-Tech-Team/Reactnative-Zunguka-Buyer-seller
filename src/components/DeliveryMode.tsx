import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../types/global.types";
import Scale from "../utils/Scale";

interface DeliveryModeProps {
  title: string;
  title1: string;
  icon: React.ReactElement;
  isSelected: boolean;
  onPress: () => void;
}

const DeliveryMode: React.FC<DeliveryModeProps> = ({
  title,
  title1,
  icon,
  isSelected,
  onPress,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        style.container,
        {
          backgroundColor: isSelected
            ? theme.colors?.primary
            : theme.colors?.white,
          borderColor: isSelected
            ? theme.colors?.transparent
            : theme.colors?.borderButtonColor,
          borderWidth: 1,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={style.txtTitle}>{title}</Text>
        <Text
          style={[
            style.txtTitle1,
            { color: isSelected ? theme.colors?.white : "#AEADAD" },
          ]}
        >
          {title1}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryMode;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    height: Scale(136),
    backgroundColor: theme.colors?.greyed,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
  },
  txtTitle1: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: "#AEADAD",
    marginTop: 10,
  },
}));
