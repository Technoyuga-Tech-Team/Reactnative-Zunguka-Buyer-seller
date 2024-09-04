import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { FullTheme, makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectMoverBookingLoading } from "../../store/MoverBooking/moverBooking.selectors";
import { getIsPackageDelivered } from "../../store/settings/settings.selectors";
import { DeliveryDetailsData } from "../../types/delivery.types";
import {
  deliveryDetailsWithOTP,
  orderDetails,
} from "../../store/MoverBooking/moverBooking.thunk";
import CustomHeader from "../../components/ui/CustomHeader";
import { LoadingState, ThemeProps } from "../../types/global.types";
import Loading from "../../components/ui/Loading";
import PredefineOTPCodeView from "../../components/ui/PredefineOTPCodeView";
import MoverItem from "../../components/ui/Mover/MoverItem";
import BorderBottomItem from "./BorderBottomItem";
import RatingPopup from "../../components/ui/popups/RatingPopup";

const DeliveryDetails1: React.FC<
  HomeNavigationProps<Route.navDeliveryDetails1>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const package_details_id = route.params?.package_details_id;
  const from_mover = route.params?.from == "mover";

  const loading = useSelector(selectMoverBookingLoading);
  const isPackageDeliverd = useSelector(getIsPackageDelivered);

  const [visibleRatePopup, setVisibleRatePopup] = useState<boolean>(false);
  const [deliveryDetailsData, setDeliveryDetailsData] =
    useState<DeliveryDetailsData>({});

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", async () => {
      getDeliveryDetails();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getDeliveryDetails = async () => {
    if (from_mover) {
      const result = await dispatch(
        orderDetails({
          package_details_id,
        })
      );
      if (orderDetails.fulfilled.match(result)) {
        if (result.payload.status == 1) {
          setDeliveryDetailsData(result.payload.data);
        }
      } else {
        if (result.payload?.status == 0) {
          setDeliveryDetailsData({});
        }
        console.log("errror orderDetails --->", result.payload);
      }
    } else {
      const result = await dispatch(
        deliveryDetailsWithOTP({
          package_details_id,
        })
      );
      if (deliveryDetailsWithOTP.fulfilled.match(result)) {
        if (result.payload.status == 1) {
          setDeliveryDetailsData(result.payload.data);
        }
      } else {
        if (result.payload?.status == 0) {
          setDeliveryDetailsData({});
        }
        console.log("errror deliveryDetailsWithOTP --->", result.payload);
      }
    }
  };

  const onPress = () => {
    setVisibleRatePopup(true);
  };
  const togglePopup = () => {
    setVisibleRatePopup(!visibleRatePopup);
  };
  const onPressConfirmSendReview = (rate: number, comment: string) => {
    togglePopup();
  };

  const onPressBackBtn = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: Route.navBuyerSellerStack,
              state: {
                routes: [
                  { name: Route.navDashboard },
                  { name: Route.navRequestToMover },
                ],
              },
            },
          ],
        })
      );
    }
  };

  const onRefresh = () => {
    getDeliveryDetails();
  };

  const getColorFromStatus = (status: string, theme: Partial<FullTheme>) => {
    return status === "pending"
      ? theme.colors?.yellowStar
      : status === "startjob"
      ? theme.colors?.primary
      : status === "completed"
      ? theme.colors?.primary
      : status === "confirmed"
      ? theme.colors?.yellowStar
      : theme.colors?.primaryText;
  };

  const getStatusStrings = (status: string) => {
    return status === "pending"
      ? "Request Pending"
      : status === "startjob"
      ? "Ongoing Job"
      : status === "completed"
      ? "Start This Job"
      : status === "confirmed"
      ? "Waiting For Payment"
      : status;
  };

  console.log("isPackageDeliverd", isPackageDeliverd);

  const title =
    isPackageDeliverd == 1 ? "Package Delivered" : "Delivery Details";
  console.log("deliveryDetailsData", deliveryDetailsData);
  return (
    <View style={style.container}>
      <CustomHeader
        title={from_mover ? "Order Details" : title}
        isOutsideBack={true}
        onPressBackBtn={onPressBackBtn}
      />
      {loading && loading === LoadingState.CREATE && <Loading />}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scrollcont}
        refreshControl={
          <RefreshControl
            refreshing={loading === LoadingState.CREATE}
            onRefresh={onRefresh}
            tintColor={theme?.colors?.primary}
          />
        }
      >
        {!from_mover && <PredefineOTPCodeView OTP={deliveryDetailsData?.otp} />}
        {deliveryDetailsData?.profile_image && (
          <MoverItem
            item={{
              profile_image: deliveryDetailsData?.profile_image,
              first_name: deliveryDetailsData?.first_name,
              last_name: deliveryDetailsData?.last_name,
              email: deliveryDetailsData?.email,
              phone_number: deliveryDetailsData?.phone_number,
              vehicle_type: deliveryDetailsData?.vehicle_type,
              rate: deliveryDetailsData?.rate,
              address: deliveryDetailsData?.city,
              avg_rate: deliveryDetailsData?.avg_rate,
            }}
          />
        )}
        <View style={{ flex: 1, marginTop: 10 }}>
          <BorderBottomItem
            title="Item name"
            value={deliveryDetailsData?.item_name}
            from_mover={false}
          />
          <BorderBottomItem
            title="Receiver"
            value={deliveryDetailsData?.receiver_name}
            from_mover={false}
            showblur={from_mover ? true : false}
          />
          <BorderBottomItem
            title="Pickup point"
            value={deliveryDetailsData?.pickup_point_address}
            from_mover={false}
            numberOfLines={3}
            showblur={from_mover ? true : false}
          />
          <BorderBottomItem
            title="Delivery point"
            value={deliveryDetailsData?.delivery_point_address}
            from_mover={false}
            numberOfLines={3}
            showblur={from_mover ? true : false}
          />
          {deliveryDetailsData?.item_size && (
            <BorderBottomItem
              title="Size"
              value={deliveryDetailsData?.item_size}
              from_mover={false}
            />
          )}
          {deliveryDetailsData?.package_delivery_date && (
            <BorderBottomItem
              title="Date"
              value={deliveryDetailsData?.package_delivery_date}
              from_mover={false}
            />
          )}
          {deliveryDetailsData?.package_delivery_time && (
            <BorderBottomItem
              title="Time"
              value={deliveryDetailsData?.package_delivery_time}
              from_mover={false}
            />
          )}
          {from_mover && (
            <BorderBottomItem
              title="Price"
              value={`$ ${deliveryDetailsData?.price || ""}`}
              from_mover={false}
            />
          )}
          {from_mover && (
            <BorderBottomItem
              title="Status"
              value={getStatusStrings(deliveryDetailsData?.status)}
              from_mover={false}
              txtColor={getColorFromStatus(deliveryDetailsData?.status, theme)}
            />
          )}
        </View>
        {/* <View style={{ marginVertical: 10 }}>
          <CustomButton
            onPress={onPress}
            title={"Rate the mover"}
            buttonWidth="full"
            variant="primary"
            type="solid"
          />
        </View> */}
      </KeyboardAwareScrollView>
      <RatingPopup
        visiblePopup={visibleRatePopup}
        togglePopup={togglePopup}
        onPressConfirmSendReview={onPressConfirmSendReview}
        isLoading={false}
      />
    </View>
  );
};

export default DeliveryDetails1;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    paddingTop: props.insets.top,
    paddingBottom: props.insets.bottom,
    backgroundColor: theme.colors?.background,
  },
  scrollcont: { paddingHorizontal: 20, flexGrow: 1 },
}));
