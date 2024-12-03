import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { DUMMY_PLACEHOLDER, RWF } from "../../constant";
import { selectUserData } from "../../store/settings/settings.selectors";
import { ThemeProps } from "../../types/global.types";
import { ProductDataProps } from "../../types/product.types";
import { getConditionItemValue } from "../../utils";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import CustomButton from "../ui/CustomButton";
import InputFieldInfo from "../ui/InputFieldInfo";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../constant/navigationConstants";
import RightIcon from "../ui/svg/RightIcon";

interface ProductItemProps {
  item: ProductDataProps;
  onPress: () => void;
  fromClosedItem: boolean;
  fromPurchase: boolean;
  onPressHireMover: () => void;
  showBorder?: boolean;
}
const ProductItem: React.FC<ProductItemProps> = ({
  item,
  onPress,
  fromClosedItem,
  fromPurchase,
  onPressHireMover,
  showBorder,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const userData = useSelector(selectUserData);
  const product_image =
    item?.images?.length > 0 ? item?.images[0]?.uri : DUMMY_PLACEHOLDER;
  const showRequestBtn = item?.is_delivery_button;
  const isSearch = item?.is_searching_button;
  const is_otp = item?.is_otp;

  const currentUsersProduct = item?.user_id == userData?.id;

  const showBtn = fromPurchase || fromClosedItem;

  return (
    <View
      style={[
        style.container,
        fromClosedItem && showBorder && style.bordercont,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <AppImage
          source={product_image}
          style={style.product}
          resizeMode="cover"
        />
        <View style={style.itemAndDealsWrapper}>
          <View style={style.secondCont}>
            <View
              style={{
                flexDirection: "row",
                // alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "50%" }}>
                <Text numberOfLines={2} style={style.txtTitle}>
                  {item?.title}
                </Text>
              </View>
              <View style={{ width: "50%", alignItems: "flex-end" }}>
                {item.status == "Saved_as_Draft" &&
                  currentUsersProduct &&
                  !fromClosedItem && <Text style={style.txtSold}>Draft</Text>}
                {item.status == "Draft" &&
                  currentUsersProduct &&
                  !fromClosedItem && (
                    <Text style={style.txtSold}>Stop Publishing</Text>
                  )}
                {item.status == "Archived" &&
                  currentUsersProduct &&
                  !fromClosedItem && <Text style={style.txtSold}>Sold</Text>}
                {item.status == "Archived" &&
                  currentUsersProduct &&
                  fromClosedItem &&
                  item.is_delivered == 1 && (
                    <Text style={style.txtSold}>Delivered</Text>
                  )}
              </View>
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
          {/* <View style={style.sellerWrapperContainer}>
            <Text style={{ fontSize: 12 }}>Seller</Text>
          </View> */}
        </View>
      </TouchableOpacity>
      {showBtn && showRequestBtn && (
        <>
          <View style={{ marginTop: 10 }}>
            <CustomButton
              onPress={() => {
                console.log("isSearch", isSearch);
                console.log("is_otp", is_otp);
                if (!(isSearch || is_otp)) {
                  onPressHireMover();
                } else if (is_otp && !fromPurchase) {
                  navigation.navigate(Route.navRequestToMover, {
                    screen: Route.navOngoingMoverRequest,
                  });
                }
              }}
              title={
                isSearch
                  ? "Searching Mover..."
                  : is_otp
                  ? `OTP ${item?.pickup_otp}`
                  : "Hire mover"
              }
              buttonWidth="full"
              variant="primary"
              type="solid"
              iconPosition="right"
              icon={is_otp ? <RightIcon color={"white"} /> : null}
            />
          </View>
          {isSearch && (
            <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
              <InputFieldInfo
                text={
                  "We are searching mover for you, once we get will notified you."
                }
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ProductItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    paddingVertical: 5,
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
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.bold,
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
    marginRight: 20,
  },
  bordercont: {
    backgroundColor: theme?.colors?.border,
  },
  itemAndDealsWrapper: {
    flex: 1,
    flexDirection: "row",
    marginRight: 20,
    alignItems: "flex-start",
  },
  sellerWrapperContainer: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderColor: theme.colors?.primary,
    backgroundColor: theme.colors?.primaryLightest,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 12,
  },
}));
