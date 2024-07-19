import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CheckBox, makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HIT_SLOP2 } from "../../constant";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import CheckIcon from "./svg/CheckIcon";
import SquareCheckIcon from "./svg/SquareCheckIcon";

interface CheckBoxSelectionProps {
  itemName: string;
  itemValue: string;
  isChecked: boolean;
  onPressCheckbox: () => void;
  isColor?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
}

const CheckBoxSelection: React.FC<CheckBoxSelectionProps> = ({
  itemName,
  itemValue,
  isChecked,
  onPressCheckbox,
  isColor,
  containerStyle,
  textStyle,
  iconSize = 25,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyle({ insets });
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[containerStyle ? containerStyle : style.itemCont]}
      onPress={onPressCheckbox}
      key={itemValue}
    >
      <CheckBox
        checked={isChecked}
        onPress={onPressCheckbox}
        hitSlop={HIT_SLOP2}
        checkedIcon={
          <CheckIcon
            color={theme.colors?.primary}
            height={Scale(iconSize)}
            width={Scale(iconSize)}
          />
        }
        uncheckedIcon={
          <SquareCheckIcon
            color={theme.colors?.iconColor}
            height={Scale(iconSize)}
            width={Scale(iconSize)}
          />
        }
        containerStyle={{
          padding: 0,
        }}
      />
      <Text style={[textStyle ? textStyle : style.txtColor]}>{itemName}</Text>
      {isColor && (
        <View style={[style.colorCont, { backgroundColor: itemValue }]} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBoxSelection;

const useStyle = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
  },
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
