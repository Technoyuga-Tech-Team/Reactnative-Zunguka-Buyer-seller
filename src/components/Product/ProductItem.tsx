import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import { DUMMY_PLACEHOLDER } from "../../constant";

interface ProductItemProps {
  item: any;
  onPress: () => void;
}
const ProductItem: React.FC<ProductItemProps> = ({ item, onPress }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const product_image = item?.productImage || DUMMY_PLACEHOLDER;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style.container}
    >
      <AppImage
        source={product_image}
        style={style.product}
        resizeMode="cover"
      />
      <View style={style.secondCont}>
        <Text numberOfLines={1} style={style.txtTitle}>
          {item.productName}
        </Text>
        <Text numberOfLines={1} style={style.txtTypeAndCategories}>
          {item.productType}
        </Text>
        <Text
          style={[
            style.txtTypeAndCategories,
            { textDecorationLine: "underline", flexWrap: "wrap" },
          ]}
        >
          {item.categories.join(", ")}
        </Text>
        <Text style={style.txtPrice}>R₣{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 20,
    flex: 1,
  },
  product: {
    height: Scale(97),
    width: Scale(115),
    borderRadius: 8,
    marginHorizontal: 20,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
  },
  txtTypeAndCategories: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    lineHeight: 18,
  },
  txtPrice: {
    fontSize: theme.fontSize?.fs11,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
  },
  secondCont: {
    flex: 1,
    minHeight: Scale(97),
    justifyContent: "space-between",
  },
}));