import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import LeftIcon from "./svg/LeftIcon";
import ShareIcon from "./svg/ShareIcon";

interface ProductHeaderProps {
  onPressBack: () => void;
  onPressShare: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onPressBack,
  onPressShare,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const RoundButton = ({
    icon,
    onPress,
  }: {
    icon: any;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={style.roundCont}
      >
        {icon}
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.container}>
      <RoundButton
        onPress={onPressBack}
        icon={<LeftIcon color={theme?.colors?.white} />}
      />
      <RoundButton
        onPress={onPressShare}
        icon={<ShareIcon color={theme?.colors?.white} height={15} width={15} />}
      />
    </View>
  );
};

export default ProductHeader;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  roundCont: {
    height: Scale(32),
    width: Scale(32),
    borderRadius: 32 / 2,
    backgroundColor: theme?.colors?.greyed,
    alignItems: "center",
    justifyContent: "center",
  },
}));
