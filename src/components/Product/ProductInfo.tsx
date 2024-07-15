import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OutlineHeartIcon from "../ui/svg/OutlineHeartIcon";
import Scale from "../../utils/Scale";
import SellerProfileWithStar from "../ui/SellerProfileWithStar";
import SimilarProductListing from "../SimilarProduct/SimilarProductListing";
import { HOT_BRANDS } from "../../constant";

const ProductInfo = () => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const ItemSeparator = () => {
    return <View style={style.border} />;
  };
  const ItemSeparator1 = () => {
    return <View style={style.border1} />;
  };

  const onPressProduct = (item: any) => {};
  return (
    <View style={style.container}>
      <View style={style.paddingCont}>
        <View style={style.productNameCont}>
          <Text style={style.txtProductName}>Samsung galaxy watch 5</Text>
          <TouchableOpacity activeOpacity={0.8} style={style.heartCont}>
            <OutlineHeartIcon color={theme?.colors?.unselectedIconColor} />
          </TouchableOpacity>
        </View>
        <Text style={style.txtPrice}>R₣ 200</Text>
        <View style={style.addrCont}>
          <Text style={style.txtDate}>Posted 04/12/2024</Text>
          <Text style={style.txtDistrict}>New York, NY</Text>
        </View>
      </View>
      <ItemSeparator />
      <View style={style.paddingCont}>
        <View>
          <Text style={[style.txtProductName, { marginBottom: 10 }]}>
            Details
          </Text>
          <View style={style.fdCont}>
            <Text style={style.txtDetails1}>Condition</Text>
            <Text style={style.txtDetails2}>New</Text>
          </View>
          <View style={style.fdCont}>
            <Text style={style.txtDetails1}>Brand</Text>
            <Text style={style.txtDetails2}>Samsung</Text>
          </View>
          <View style={style.fdCont}>
            <Text style={style.txtDetails1}>Category</Text>
            <Text style={style.txtDetails2}>Wearables,Electronic,</Text>
          </View>
          <View style={style.fdCont}>
            <Text style={style.txtDetails1}>Model</Text>
            <Text style={style.txtDetails2}>Other</Text>
          </View>
        </View>
        <ItemSeparator1 />
        <View>
          <Text style={[style.txtProductName, { marginBottom: 10 }]}>
            Description
          </Text>
          <Text style={style.txtdesc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        <ItemSeparator1 />
        <View>
          <Text style={[style.txtProductName, { marginBottom: 10 }]}>
            Address
          </Text>
          <Text style={style.txtAddress}>FUTURES ARCHITECTS, BP. 1438</Text>
        </View>
      </View>
      <ItemSeparator />
      <View style={style.paddingCont}>
        <View style={style.addrCont}>
          <Text style={[style.txtProductName, { marginBottom: 10 }]}>
            Seller details
          </Text>
          <Text style={style.txtDistrict}>View profile</Text>
        </View>
        <SellerProfileWithStar />
      </View>
      <ItemSeparator />
      <View style={style.paddingCont}>
        <Text style={[style.txtProductName, { marginBottom: 10 }]}>
          Similar items
        </Text>
        <SimilarProductListing
          similarProductData={HOT_BRANDS}
          onPressProduct={(item) => onPressProduct(item)}
        />
      </View>
    </View>
  );
};

export default ProductInfo;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
  },
  heartCont: {
    height: Scale(32),
    width: Scale(32),
    borderRadius: Scale(32 / 2),
    borderColor: theme?.colors?.borderButtonColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtProductName: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.bold,
    color: theme?.colors?.black,
  },
  txtPrice: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.bold,
    color: theme?.colors?.black,
    marginVertical: 5,
  },
  productNameCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtDate: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.secondaryText,
  },
  txtDistrict: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.primary,
  },
  addrCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paddingCont: {
    padding: 20,
  },
  border: {
    height: 5,
    backgroundColor: theme?.colors?.border,
    width: "100%",
  },
  border1: {
    height: 1,
    backgroundColor: theme?.colors?.border,
    width: "100%",
    marginVertical: 10,
  },
  fdCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  txtDetails1: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.greyed,
    width: "30%",
  },
  txtDetails2: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.black,
  },
  txtdesc: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.greyed,
  },
  txtAddress: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.greyed,
  },
}));
