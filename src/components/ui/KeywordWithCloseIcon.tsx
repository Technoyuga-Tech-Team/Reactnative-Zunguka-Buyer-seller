import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import { HIT_SLOP } from "../../constant";
import CloseIcon from "./svg/CloseIcon";

interface KeywordWithCloseIconProps {
  name: string;
  onPress: () => void;
}

const KeywordWithCloseIcon: React.FC<KeywordWithCloseIconProps> = ({
  name,
  onPress,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      <Text style={style.txtName}>{name}</Text>
      <TouchableOpacity
        onPress={onPress}
        hitSlop={HIT_SLOP}
        style={style.closeBtn}
      >
        <CloseIcon color={theme?.colors?.black} height={15} width={15} />
      </TouchableOpacity>
    </View>
  );
};

export default KeywordWithCloseIcon;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme?.colors?.borderButtonColor,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    overflow: "hidden",
    flexDirection: "row",
    marginTop: 10,
  },
  closeBtn: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: theme?.colors?.borderButtonColor,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  txtName: {
    fontSize: theme?.fontSize?.fs16,
    fontFamily: theme?.fontFamily?.regular,
    color: theme?.colors?.black,
  },
}));
