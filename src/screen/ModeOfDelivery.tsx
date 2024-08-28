import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeNavigationProps } from "../types/navigation";
import { Route } from "../constant/navigationConstants";
import CustomButton from "../components/ui/CustomButton";
import { ThemeProps } from "../types/global.types";
import { HAS_NOTCH, RWF } from "../constant";
import DeliveryMode from "../components/DeliveryMode";
import SelfPickupIcon from "../components/ui/svg/SelfPickupIcon";
import ScooterIcon from "../components/ui/svg/ScooterIcon";
import CustomHeader from "../components/ui/CustomHeader";
import { CommonActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getProductInfo } from "../store/settings/settings.selectors";

const ModeOfDelivery: React.FC<
  HomeNavigationProps<Route.navModeOfDelivery>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const productInfo = useSelector(getProductInfo);

  const [selfPickupSelected, setSelfPickupSelected] = useState(false);
  const [moverSelected, setMoverSelected] = useState(false);

  const onPressSelf = () => {
    setSelfPickupSelected(true);
    setMoverSelected(false);
  };
  const onPressMover = () => {
    setSelfPickupSelected(false);
    setMoverSelected(true);
  };

  const onPressContinue = () => {
    if (moverSelected) {
      navigation.navigate(Route.navPayment, {
        modeOfDelivery: "delivery_service",
        deliveryPrice: getDeliveryServiceAmount(productInfo?.modeOfTransport),
      });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Route.navDashboard }],
        })
      );
    }
  };

  const getDeliveryServiceAmount = (mode: string | undefined) => {
    // we added 50 as a static value
    return "50";
    // return mode == "moto" ? "2000" : mode == "cab" ? "10,000" : "12,000";
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Select delivery mode" />
      <View style={style.headerCont} />
      <View style={style.centerCont}>
        <DeliveryMode
          onPress={onPressSelf}
          title={"Self Pickup"}
          title1={"Attract No charges"}
          icon={<SelfPickupIcon />}
          isSelected={selfPickupSelected}
        />
        <DeliveryMode
          onPress={onPressMover}
          title={"Delivery service"}
          title1={`${RWF} ${getDeliveryServiceAmount(
            productInfo?.modeOfTransport
          )}`}
          icon={<ScooterIcon />}
          isSelected={moverSelected}
        />
      </View>
      <View>
        <CustomButton
          onPress={onPressContinue}
          title={"Continue"}
          buttonWidth="full"
          variant="primary"
          type="solid"
        />
      </View>
    </View>
  );
};

export default ModeOfDelivery;

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
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs24,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
  },
  txtTitle1: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginTop: 10,
  },
  headerCont: {
    borderBottomColor: theme?.colors?.border,
    borderBottomWidth: 1,
  },
  centerCont: {
    marginTop: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
}));
