import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images } from "../../assets/images";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";

interface SimilarProductItemProps {
  item: any;
  onPressProduct: () => void;
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

const SimilarProductItem: React.FC<SimilarProductItemProps> = ({
  item,
  onPressProduct,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const product_image = getIcons(item.key) || Images.PLACEHOLDER_IMAGE;

  return (
    <TouchableOpacity
      onPress={onPressProduct}
      activeOpacity={0.9}
      style={style.container}
    >
      <ImageBackground
        source={product_image}
        style={style.product}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
          style={style.linearCont}
        >
          <View style={style.txtCont}>
            <Text style={style.txtTitle}>{item.name}</Text>
            <Text style={style.txtPrice}>R₣ 200</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SimilarProductItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    marginVertical: 10,
    marginRight: 20,
    width: Scale(109),
    height: Scale(109),
  },
  product: {
    width: Scale(109),
    height: Scale(109),
    borderRadius: Scale(4),
    resizeMode: "contain",
    zIndex: 1,
  },
  imageBg: {
    width: Scale(109),
    height: Scale(109),
    borderRadius: Scale(4),
    backgroundColor: theme.colors?.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.white,
  },
  linearCont: {
    position: "absolute",
    zIndex: 11,
    width: Scale(109),
    height: Scale(109),
    borderRadius: Scale(4),
  },
  txtCont: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  txtPrice: {
    fontSize: theme.fontSize?.fs11,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.white,
  },
}));
