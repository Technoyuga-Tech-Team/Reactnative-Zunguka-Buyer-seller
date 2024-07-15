import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import RightIcon from "../ui/svg/RightIcon";

interface FilterItemProps {
  onPress: () => void;
  title: string;
  value: string;
  isSelected?: boolean;
}

const FilterItem: React.FC<FilterItemProps> = ({
  onPress,
  title,
  value,
  isSelected,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyle({ insets });
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style.container}
    >
      <Text style={style.txtTitle}>{title}</Text>
      <View style={style.innerCont}>
        <Text style={style.txtData} numberOfLines={1}>
          {value}
        </Text>
        <RightIcon
          style={{ transform: [{ rotate: isSelected ? "90deg" : "0deg" }] }}
          color={"#664B1B"}
          height={18}
          width={18}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FilterItem;

const useStyle = makeStyles((theme, props: ThemeProps) => ({
  container: {
    height: Scale(50),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  innerCont: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
  },
  txtData: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.medium,
    color: "#664B1B",
    width: "90%",
    textAlign: "right",
    marginRight: 5,
  },
}));
