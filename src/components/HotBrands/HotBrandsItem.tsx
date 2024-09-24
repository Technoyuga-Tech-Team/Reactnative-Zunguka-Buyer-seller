import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HotBrandaDataProps } from "../../types/dashboard.types";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import { SCREEN_WIDTH } from "../../constant";

interface HotBrandsItemProps {
  item: HotBrandaDataProps;
  index: number;
  onPressHotBrands: () => void;
}

const HotBrandsItem: React.FC<HotBrandsItemProps> = ({
  item,
  index,
  onPressHotBrands,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPressHotBrands}
      activeOpacity={0.9}
      style={[style.container]}
    >
      <View style={style.imageBg}>
        <AppImage source={item.icon} style={style.product} resizeMode="cover" />
      </View>

      <Text style={style.txtTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default HotBrandsItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    marginVertical: 10,
    width: (SCREEN_WIDTH - 40) / 3,
  },
  product: {
    height: Scale(125),
    width: Scale(110),
    borderRadius: Scale(10),
    resizeMode: "contain",
  },
  imageBg: {
    height: Scale(125),
    borderRadius: Scale(10),
    backgroundColor: theme.colors?.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginTop: 5,
    textTransform: "capitalize",
    textAlign: "left",
    marginLeft: 5,
  },
}));
