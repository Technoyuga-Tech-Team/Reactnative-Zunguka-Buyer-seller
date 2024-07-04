import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import { Images } from "../../assets/images";
import HomeIcon from "../ui/svg/HomeIcon";

interface HotBrandsItemProps {
  item: any;
  onPressHotBrands: () => void;
}

const getIcons = (key: number) => {
  return key == 1
    ? Images.ADIDAS_IMAGE
    : key == 2
    ? Images.ROLEX_IMAGE
    : key == 3
    ? Images.GUCCI_IMAGE
    : key == 4
    ? Images.NIKE_IMAGE
    : key == 5
    ? Images.SAMSUNG_IMAGE
    : Images.APPLE_IMAGE;
};

const HotBrandsItem: React.FC<HotBrandsItemProps> = ({
  item,
  onPressHotBrands,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const product_image = getIcons(item.key) || Images.PLACEHOLDER_IMAGE;

  return (
    <TouchableOpacity
      onPress={onPressHotBrands}
      activeOpacity={0.9}
      style={style.container}
    >
      <View style={style.imageBg}>
        <AppImage
          source={product_image}
          style={style.product}
          resizeMode="cover"
        />
      </View>

      <Text style={style.txtTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default HotBrandsItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    marginVertical: 10,
    marginRight: 20,
    width: Scale(110),
  },
  product: {
    height: Scale(125),
    width: Scale(110),
    borderRadius: Scale(10),
    resizeMode: "contain",
  },
  imageBg: {
    height: Scale(125),
    width: Scale(110),
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
