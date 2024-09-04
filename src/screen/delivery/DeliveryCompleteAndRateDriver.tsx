import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";

import { CommonActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectMoverBookingLoading } from "../../store/MoverBooking/moverBooking.selectors";
import { UserData } from "../../types/user.types";
import { useGetUserById } from "../../hooks/useGetUserById";
import { setIsNewPackageDeliverd } from "../../store/settings/settings.slice";
import { addRating } from "../../store/MoverBooking/moverBooking.thunk";
import { setSuccess } from "../../store/global/global.slice";
import { HAS_NOTCH, HIT_SLOP2 } from "../../constant";
import CloseIcon from "../../components/ui/svg/CloseIcon";
import MoverItem from "../../components/ui/Mover/MoverItem";
import RatingBox from "../../components/ui/RatingBox";
import { CustomTxtInput } from "../../components/ui/CustomTextInput";
import CustomButton from "../../components/ui/CustomButton";
import { LoadingState, ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { Images } from "../../assets/images";

const DeliveryCompleteAndRateDriver: React.FC<
  HomeNavigationProps<Route.navDeliveryCompleteAndRateDriver>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const loading = useSelector(selectMoverBookingLoading);

  const [currentRating, setCurrentRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<UserData>();

  const user_id = route.params?.user_id;
  const package_details_id = route.params?.package_details_id;

  const { refetch } = useGetUserById(user_id, { enabled: false });

  useEffect(() => {
    dispatch(setIsNewPackageDeliverd(0));
    refetch()
      .then(({ data, isError }) => {
        if (!isError && data) {
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [refetch]);

  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
  };

  const onChangeComment = (val: string) => {
    setComment(val);
  };

  const onPressCancel = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Route.navBuyerSellerStack }],
        })
      );
    }
  };

  const onPressConfirmSendReview = async () => {
    const result = await dispatch(
      addRating({
        mover_id: user_id,
        rate: currentRating,
        comment: comment,
        package_details_id,
      })
    );
    if (addRating.fulfilled.match(result)) {
      if (result.payload.status == 1) {
        dispatch(setSuccess(result.payload.message));
        setCurrentRating(0);
        setComment("");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Route.navBuyerSellerStack }],
          })
        );
      }
    } else {
      console.log("errror addRating --->", result.payload);
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={theme.colors?.transparent}
        barStyle={"dark-content"}
      />
      <ImageBackground
        source={Images.DELIVERY_COMPLETE}
        style={style.container}
      >
        <TouchableOpacity
          hitSlop={HIT_SLOP2}
          onPress={onPressCancel}
          activeOpacity={0.8}
          style={style.closeCont}
        >
          <CloseIcon color={theme.colors?.white} />
        </TouchableOpacity>

        <KeyboardAwareScrollView contentContainerStyle={style.innerCont}>
          <Text style={style.txtTitle}>Rate the service</Text>
          <Text style={style.txtTitle1}>
            Let us know your feedback about the service of the mover
          </Text>
          {user && (
            <MoverItem
              item={{
                profile_image: user?.profile_image,
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
                phone_number: user?.phone_number,
                vehicle_type: user?.vehicle_type,
                rate: user?.rate,
                address: user?.city,
                avg_rate: user?.avg_rate,
                total_user_rate: user?.total_user_rate,
              }}
            />
          )}
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <RatingBox
              rating={currentRating}
              onRatingChange={handleRatingChange}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomTxtInput
              placeholder="Write your comment"
              returnKeyType="done"
              returnKeyLabel="done"
              keyboardType={"default"}
              textInputStyle={style.txtDesc}
              style={style.textInput}
              multiline={true}
              textAlignVertical="top"
              onChangeText={onChangeComment}
              value={comment}
            />
          </View>

          <View style={{ marginVertical: 10, paddingBottom: insets.bottom }}>
            <CustomButton
              onPress={onPressConfirmSendReview}
              title={"Send review"}
              buttonWidth="full"
              variant="primary"
              type="solid"
              disabled={
                comment == "" ||
                currentRating <= 0 ||
                loading === LoadingState.CREATE
              }
              loading={loading === LoadingState.CREATE}
            />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </>
  );
};

export default DeliveryCompleteAndRateDriver;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    paddingTop: props.insets.top,
    paddingBottom:
      Platform.OS === "ios"
        ? HAS_NOTCH
          ? props.insets.bottom
          : props.insets.bottom + 10
        : props.insets.bottom + 10,
    backgroundColor: theme.colors?.background,
    resizeMode: "contain",
  },
  txtHeadreTitle: {
    fontSize: theme.fontSize?.fs24,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
  },
  headerCont: {
    height: Scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  innerCont: {
    flex: 1,
    paddingHorizontal: 20,
  },
  priceCont: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  txtInputPrice: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.greyedColor,
  },
  txtPrice: {
    fontSize: RFValue(34, SCREEN_HEIGHT),
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    marginTop: 10,
  },
  txtInCont: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  txtCurrentLocation: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.primary,
    marginLeft: 10,
  },
  locationCont: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  closeCont: {
    alignSelf: "flex-start",
    height: Scale(50),
    width: Scale(50),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  txtDesc: {
    height: Scale(123),
    backgroundColor: theme?.colors?.lightGrey,
    paddingLeft: 10,
    paddingTop: 5,
    borderRadius: 4,
    marginTop: 10,
  },
  textInput: {
    height: Scale(110),
    width: "100%",
    color: theme.colors?.textPrimary,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs13,
    letterSpacing: -0.08,
  },
  txtTitle: {
    fontSize: theme?.fontSize?.fs17,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    textAlign: "center",
  },
  txtTitle1: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.secondaryText,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 10,
  },
}));
