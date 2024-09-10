import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DUMMY_PLACEHOLDER, RWF, SCREEN_WIDTH } from "../../constant";
import { ThemeProps } from "../../types/global.types";
import { ProductDataProps } from "../../types/product.types";
import { getConditionItemValue } from "../../utils";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import CustomButton from "../ui/CustomButton";

interface ProductItemProps {
  item: ProductDataProps;
  onPress: () => void;
  fromClosedItem: boolean;
  onPressHireMover: () => void;
}
const ProductItem: React.FC<ProductItemProps> = ({
  item,
  onPress,
  fromClosedItem,
  onPressHireMover,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const product_image = item?.images[0]?.image || DUMMY_PLACEHOLDER;
  const showRequestBtn = item?.is_delivery_button;
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <AppImage
          source={product_image}
          style={style.product}
          resizeMode="cover"
        />
        <View style={style.secondCont}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text numberOfLines={1} style={style.txtTitle}>
              {item?.title}
            </Text>
            {/* <Text style={style.txtSold}>Sold</Text> */}
          </View>

          <Text numberOfLines={1} style={style.txtTypeAndCategories}>
            {getConditionItemValue(item?.condition_of_item)}
          </Text>
          <Text
            style={[
              style.txtTypeAndCategories,
              { textDecorationLine: "underline", flexWrap: "wrap" },
            ]}
          >
            {item?.category?.map((ele) => ele.name).join(", ")}
          </Text>
          <Text style={style.txtPrice}>
            {RWF} {item.sale_price}
          </Text>
        </View>
      </TouchableOpacity>
      {fromClosedItem && showRequestBtn && (
        <View style={{ marginTop: 10 }}>
          <CustomButton
            onPress={onPressHireMover}
            title={"Hire mover"}
            buttonWidth="full"
            variant="primary"
            type="solid"
          />
        </View>
      )}
    </View>
  );
};

export default ProductItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    marginVertical: 5,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // paddingRight: 20,
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
  txtSold: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.red,
    textDecorationLine: "underline",
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
