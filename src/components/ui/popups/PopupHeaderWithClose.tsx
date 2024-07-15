import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "react-native-elements";
import CloseIcon from "../svg/CloseIcon";
import { HIT_SLOP } from "../../../constant";

interface PopupHeaderWithCloseProps {
  onPressClose: () => void;
  title: string;
}

const PopupHeaderWithClose: React.FC<PopupHeaderWithCloseProps> = ({
  onPressClose,
  title,
}) => {
  const style = useStyle();
  const { theme } = useTheme();
  return (
    <View style={style.cont}>
      <Text style={style.txtLoginToZunguka}>{title}</Text>
      <TouchableOpacity
        onPress={onPressClose}
        hitSlop={HIT_SLOP}
        activeOpacity={0.8}
      >
        <CloseIcon color={theme?.colors?.black} height={15} width={15} />
      </TouchableOpacity>
    </View>
  );
};

export default PopupHeaderWithClose;
const useStyle = makeStyles((theme) => ({
  cont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  txtLoginToZunguka: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    marginTop: 10,
  },
}));
