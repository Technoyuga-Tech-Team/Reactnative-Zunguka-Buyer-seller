import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RightIcon from "./ui/svg/RightIcon";
import Scale from "../utils/Scale";
import { HIT_SLOP } from "../constant";

interface SellProductItemsProps {
  title: string;
  value: string;
  onPressItem: () => void;
  error: string;
}

const SellProductItems: React.FC<SellProductItemsProps> = ({
  title,
  value,
  onPressItem,
  error,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      <Text style={style.txtTitle}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressItem}
        hitSlop={HIT_SLOP}
        style={style.innerCont}
      >
        <Text style={style.txtVal}>{value ? value : "-"}</Text>
        <RightIcon
          color={theme?.colors?.unselectedIconColor}
          height={16}
          width={16}
        />
      </TouchableOpacity>
      {error && <Text style={style.error}>{error}</Text>}
    </View>
  );
};

export default SellProductItems;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: { marginTop: 10 },
  txtTitle: {
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs16,
  },
  innerCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: Scale(40),
    borderBottomColor: theme?.colors?.border,
    borderBottomWidth: 1,
  },
  error: {
    marginTop: 5,
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme?.fontFamily?.regular,
    color: theme.colors?.error,
  },
  txtVal: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme?.fontFamily?.regular,
    color: theme?.colors?.textPrimary,
  },
}));
