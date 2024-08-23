import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import { ProductDetailsDataProps } from "../../types/product.types";
import Scale from "../../utils/Scale";
import NoDataFound from "../ui/NoDataFound";
import MessageOutlineIcon from "../ui/svg/MessageOutlineIcon";
import OutlineHeartIcon from "../ui/svg/OutlineHeartIcon";

interface ArchivedProductInfoProps {
  productDetails: ProductDetailsDataProps;
}

const ArchivedProductInfo: React.FC<ArchivedProductInfoProps> = ({
  productDetails,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const ItemSeparator = () => {
    return <View style={style.border} />;
  };

  const time = productDetails?.created_at
    ? moment(productDetails?.created_at).format("DD/MM/YYYY")
    : "";

  const Addr =
    productDetails?.district && productDetails?.sector
      ? `${productDetails?.district}, ${productDetails?.sector}`
      : productDetails?.address;
  return (
    <>
      <View style={style.container}>
        <View style={style.paddingCont}>
          <View style={style.productNameCont}>
            <Text style={style.txtProductName}>{productDetails?.title}</Text>

            <TouchableOpacity activeOpacity={0.8} style={style.heartCont}>
              <OutlineHeartIcon color={theme?.colors?.unselectedIconColor} />
            </TouchableOpacity>
          </View>
          <View style={style.productNameCont}>
            <Text style={style.txtPrice}>R₣ {productDetails?.sale_price}</Text>

            <TouchableOpacity activeOpacity={0.8} style={style.heartCont}>
              <MessageOutlineIcon
                color={theme?.colors?.unselectedIconColor}
                height={15}
                width={15}
              />
            </TouchableOpacity>
          </View>
          <View style={style.addrCont}>
            <Text style={style.txtDate}>Posted {time}</Text>
            <Text style={style.txtDistrict}>{Addr}</Text>
          </View>
        </View>
        <ItemSeparator />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataFound title="This Item is no longer Available" />
        </View>
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme?.colors?.blackTrans,
            zIndex: 111,
          }}
        ></View>
      </View>
    </>
  );
};

export default ArchivedProductInfo;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    zIndex: 1,
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
