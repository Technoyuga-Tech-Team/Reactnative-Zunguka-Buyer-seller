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
import { ProductDetailsDataProps } from "../../types/product.types";
import moment from "moment";
import { getConditionItemValue } from "../../utils";
import FilledHeartIcon from "../ui/svg/filledHeartIcon";
import InboxIcon from "../ui/svg/InboxIcon";
import MessageOutlineIcon from "../ui/svg/MessageOutlineIcon";

interface ProductInfoProps {
  productDetails: ProductDetailsDataProps | null;
  onPressSavedItem: () => void;
  isProductLike: boolean;
  onPressMessage: () => void;
  productLikes: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  productDetails,
  onPressSavedItem,
  isProductLike,
  onPressMessage,
  productLikes,
}) => {
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

  const time = productDetails?.created_at
    ? moment(productDetails?.created_at).format("DD/MM/YYYY")
    : "";

  return (
    <View style={style.container}>
      <View style={style.paddingCont}>
        <View style={style.productNameCont}>
          <Text style={style.txtProductName}>{productDetails?.title}</Text>
          <TouchableOpacity
            onPress={onPressSavedItem}
            activeOpacity={0.8}
            style={style.heartCont}
          >
            {isProductLike ? (
              <FilledHeartIcon color={"#D0650F"} />
            ) : (
              <OutlineHeartIcon color={theme?.colors?.unselectedIconColor} />
            )}
            {productLikes > 0 && (
              <Text style={style.txtCount}>{productLikes}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={style.productNameCont}>
          <Text style={style.txtPrice}>R₣ {productDetails?.sale_price}</Text>
          <TouchableOpacity
            onPress={onPressMessage}
            activeOpacity={0.8}
            style={style.heartCont}
          >
            <MessageOutlineIcon
              color={theme?.colors?.unselectedIconColor}
              height={15}
              width={15}
            />
            {/* <Text style={style.txtCount}>100</Text> */}
          </TouchableOpacity>
        </View>
        {/* <Text style={style.txtPrice}>R₣ {productDetails?.sale_price}</Text> */}
        <View style={style.addrCont}>
          <Text style={style.txtDate}>Posted {time}</Text>
          <Text style={style.txtDistrict}>{productDetails?.city}</Text>
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
            <Text style={style.txtDetails2}>
              {getConditionItemValue(productDetails?.condition_of_item)}
            </Text>
          </View>
          <View style={style.fdCont}>
            <Text style={style.txtDetails1}>Brand</Text>
            <Text style={style.txtDetails2}>{productDetails?.brand?.name}</Text>
          </View>
          <View style={style.fdCont}>
            <Text style={style.txtDetails1}>Category</Text>
            <Text
              numberOfLines={2}
              style={[
                style.txtDetails2,
                {
                  textDecorationLine: "underline",
                },
              ]}
            >
              {productDetails?.category?.map((ele) => ele.name).join(", ")}
            </Text>
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
          <Text style={style.txtdesc}>{productDetails?.description}</Text>
        </View>
        <ItemSeparator1 />
        <View>
          <Text style={[style.txtProductName, { marginBottom: 10 }]}>
            Address
          </Text>
          <Text style={style.txtAddress}>{productDetails?.address}</Text>
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
        <SellerProfileWithStar userData={productDetails?.user} />
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
    minWidth: Scale(32),
    paddingHorizontal: 8,
    borderRadius: Scale(32 / 2),
    borderColor: theme?.colors?.borderButtonColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
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
    marginTop: 10,
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
    width: "70%",
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
  txtCount: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.bold,
    color: theme?.colors?.greyed,
    marginLeft: 5,
  },
}));
