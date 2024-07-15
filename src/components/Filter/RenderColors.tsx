import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { CheckBox, makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckIcon from "../ui/svg/CheckIcon";
import Scale from "../../utils/Scale";
import SquareCheckIcon from "../ui/svg/SquareCheckIcon";
import { HIT_SLOP2 } from "../../constant";

interface RenderColorsProps {
  selectedColors: any[];
  data: any[];
  onSelect: (val: any) => void;
}

const RenderColors: React.FC<RenderColorsProps> = ({
  selectedColors,
  data,
  onSelect,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyle({ insets });
  const { theme } = useTheme();
  const [colors, setColors] = useState<string[]>(selectedColors);

  const handleCheckboxChange = (ele: any) => {
    const isSelected = colors.includes(ele.colorName);
    const updatedColors = isSelected
      ? colors.filter((c) => c !== ele.colorName)
      : [...colors, ele.colorName];
    setColors(updatedColors);
    onSelect(updatedColors);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
      {data?.map((ele) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.itemCont}
            onPress={() => handleCheckboxChange(ele)}
            key={ele.colorCode}
          >
            <CheckBox
              checked={colors.includes(ele.colorName)}
              onPress={() => handleCheckboxChange(ele)}
              hitSlop={HIT_SLOP2}
              checkedIcon={
                <CheckIcon
                  color={theme.colors?.primary}
                  height={Scale(25)}
                  width={Scale(25)}
                />
              }
              uncheckedIcon={
                <SquareCheckIcon
                  color={theme.colors?.iconColor}
                  height={Scale(25)}
                  width={Scale(25)}
                />
              }
              containerStyle={{
                padding: 0,
              }}
            />
            <Text style={style.txtColor}>{ele.colorName}</Text>
            <View
              style={[style.colorCont, { backgroundColor: ele.colorCode }]}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default RenderColors;

const useStyle = makeStyles((theme, props: ThemeProps) => ({
  container: {},
  itemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: Scale(50),
    paddingHorizontal: 20,
  },
  txtColor: {
    fontSize: theme.fontSize?.fs18,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
  },
  colorCont: {
    height: Scale(12),
    width: Scale(12),
    borderRadius: Scale(12 / 2),
    marginLeft: 10,
    borderColor: theme.colors?.black,
    borderWidth: 0.5,
  },
}));
