import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { DUMMY_PLACEHOLDER, RWF, SCREEN_WIDTH } from "../../constant";
import { selectUserData } from "../../store/settings/settings.selectors";
import { ThemeProps } from "../../types/global.types";
import { ProductDataProps } from "../../types/product.types";
import { check24HoursPassedOrNot, getConditionItemValue } from "../../utils";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import CustomButton from "../ui/CustomButton";
import InputFieldInfo from "../ui/InputFieldInfo";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../constant/navigationConstants";
import RightIcon from "../ui/svg/RightIcon";
import RatingPopup from "../ui/popups/RatingPopup";
import RatingItemPopup from "../ui/popups/RateItemsPopup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addRatingForItem,
  updateBuyerRatingStatus,
} from "../../store/Product/product.thunk";
import VerifiedIcon from "../ui/svg/VerifiedIcon";
import UnVerifiedIcon from "../ui/svg/UnVerifiedIcon";

interface ProductItemProps {
  item: ProductDataProps;
  onPress: () => void;
  fromClosedItem: boolean;
  fromPurchase: boolean;
  onPressHireMover: () => void;
  showBorder?: boolean;
  displayLabel?: string;
}
const ProductItem: React.FC<ProductItemProps> = ({
  item,
  onPress,
  fromClosedItem,
  fromPurchase,
  onPressHireMover,
  showBorder,
  displayLabel,
  updateArrayAfterRatingReview,
}) => {
  const { theme } = useTheme();

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const userData = useSelector(selectUserData);
  const dispatch = useAppDispatch();

  const [rateSellerPopup, setRateSellerPopup] = useState(null);
  const [rateSellerPopupLoader, setRateSellerPopupLoader] = useState(false);

  const product_image =
    item?.images?.length > 0 ? item?.images[0]?.uri : DUMMY_PLACEHOLDER;
  const showRequestBtn = item?.is_delivery_button;
  const isSearch = item?.is_searching_button;
  const is_otp = item?.is_otp;

  const currentUsersProduct = item?.user_id == userData?.id;

  const showBtn = fromPurchase || fromClosedItem;

  const togglePopup = () => {
    setRateSellerPopup(null);
  };

  const onPressConfirmSendReview = async (rate: number, comment: string) => {
    setRateSellerPopupLoader(true);
    const result = await dispatch(
      addRatingForItem({
        item_id: rateSellerPopup?.id,
        rate: rate,
        rate_message: comment,
      })
    );
    if (result?.payload?.data) {
      updateArrayAfterRatingReview(result?.payload?.data);
    }
    setRateSellerPopup(null);
    setRateSellerPopupLoader(false);
  };

  const onPressUpdateReviewStatus = async (status) => {
    setRateSellerPopupLoader(true);
    const result = await dispatch(
      updateBuyerRatingStatus({
        item_id: rateSellerPopup?.id,
        status,
      })
    );
    if (result?.payload?.data) {
      updateArrayAfterRatingReview(result?.payload?.data);
    }
    setRateSellerPopup(null);
    setRateSellerPopupLoader(false);
  };

  const onPressMessage = () => {
    setRateSellerPopup(null);
    navigation.navigate(Route.navChatroom, {
      receiver_id: `${rateSellerPopup?.user_id}`,
      product_id: `${rateSellerPopup?.id}`,
    });
  };

  const check24hourPassedOrNot = useMemo(() => {
    return check24HoursPassedOrNot(item?.delivered_at);
  }, [item]);

  return (
    <>
      {rateSellerPopup && (
        <RatingItemPopup
          visiblePopup={rateSellerPopup}
          togglePopup={togglePopup}
          isLoading={rateSellerPopupLoader}
          popupLabel={"Rate the item"}
          onPressMessage={onPressMessage}
          onPressConfirmSendReview={onPressConfirmSendReview}
          onPressUpdateReviewStatus={onPressUpdateReviewStatus}
        />
      )}

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
            {displayLabel && (
              <View
                style={[
                  style.sellerWrapperContainer,
                  {
                    backgroundColor: item?.is_buyer
                      ? theme.colors?.lightGreen
                      : theme.colors?.primaryLightest,
                    borderColor: item?.is_buyer
                      ? theme.colors?.green
                      : theme.colors?.primary,
                  },
                ]}
              >
                <Text style={{ fontSize: 12, color: theme.colors?.black }}>
                  {item?.is_delivered
                    ? item?.is_buyer
                      ? "Bought"
                      : "Sold"
                    : item?.is_buyer
                    ? "Buyer"
                    : "Seller"}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        {showBtn && showRequestBtn && (isSearch || is_otp) && (
          <>
            <View style={{ marginTop: 10 }}>
              <CustomButton
                onPress={() => {
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

        {showBtn &&
          showRequestBtn &&
          !isSearch &&
          !is_otp &&
          !item?.is_buyer && (
            <>
              <View style={{ marginTop: 10 }}>
                <CustomButton
                  onPress={() => {
                    onPressHireMover();
                  }}
                  title={"Hire mover"}
                  buttonWidth="full"
                  variant="primary"
                  type="solid"
                  iconPosition="right"
                />
              </View>
            </>
          )}

        {!!item.is_delivered && !check24hourPassedOrNot && (
          <View>
            {!!item?.is_buyer ? (
              <View style={{ marginTop: 10 }}>
                <CustomButton
                  onPress={() => {
                    setRateSellerPopup(item);
                  }}
                  title={
                    !item?.buyer_rating
                      ? "Rate Seller Now"
                      : !item?.seller_rating
                      ? "Seller not rate yet"
                      : "View Rate"
                  }
                  buttonWidth="full"
                  variant="primary"
                  type="solid"
                />
              </View>
            ) : (
              <View style={{ marginTop: 10 }}>
                <CustomButton
                  onPress={() => {
                    !item?.is_buyer && !item?.buyer_rating
                      ? null
                      : setRateSellerPopup(item);
                  }}
                  title={
                    !item?.buyer_rating
                      ? "Buyer not ret yet"
                      : item?.seller_rating
                      ? "View Rating"
                      : "Rate Buyer Now"
                  }
                  buttonWidth="full"
                  variant="primary"
                  type="solid"
                />
              </View>
            )}
          </View>
        )}

        {!!item.is_delivered &&
          check24hourPassedOrNot &&
          (item?.buyer_rating || item?.seller_rating) && (
            <View>
              <View style={{ marginTop: 10 }}>
                <CustomButton
                  onPress={() => {
                    setRateSellerPopup(item);
                  }}
                  title={"View Rate"}
                  buttonWidth="full"
                  variant="primary"
                  type="solid"
                />
              </View>
            </View>
          )}

        {/* {!!item.is_delivered &&
          !!item?.is_buyer &&
          !check24hourPassedOrNot &&
          !item?.rated_by_buyer && (
            <View style={{ marginTop: 10 }}>
              <CustomButton
                icon={
                  !!item?.rated_by_buyer &&
                  (!!item?.rated_approved_by_seller ? (
                    <VerifiedIcon color={theme?.colors?.success} />
                  ) : (
                    <UnVerifiedIcon color={theme?.colors?.error} />
                  ))
                }
                onPress={() => {
                  setRateSellerPopup(item);
                }}
                title={"Rate now"}
                buttonWidth="full"
                variant="primary"
                type="solid"
              />
            </View>
          )}

        {!!item.is_delivered && !!item?.rated_by_buyer && (
          <View style={{ marginTop: 10 }}>
            <CustomButton
              onPress={() => {
                setRateSellerPopup(item);
              }}
              title={
                item?.is_buyer
                  ? item?.rated_approved_by_seller == null
                    ? "Verification Pending"
                    : item?.rated_approved_by_seller == true
                    ? `Verified(${item?.rated_by_buyer})`
                    : `Rejected(${item?.rated_by_buyer})`
                  : item?.rated_approved_by_seller == null
                  ? "Verify Rating"
                  : item?.rated_approved_by_seller == true
                  ? `Verified(${item?.rated_by_buyer})`
                  : `Rejected(${item?.rated_by_buyer})`
              }
              buttonWidth="full"
              variant="primary"
              type="solid"
              backgroundColor={
                item?.rated_approved_by_seller == true
                  ? theme.colors?.success
                  : item?.rated_approved_by_seller == false
                  ? theme.colors?.error
                  : theme.colors?.primary
              }
            />
          </View>
        )} */}
      </View>
    </>
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
