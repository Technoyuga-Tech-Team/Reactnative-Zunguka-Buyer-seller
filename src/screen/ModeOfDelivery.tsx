import React, { useState } from "react";
import { Platform, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import DeliveryMode from "../components/DeliveryMode";
import CustomButton from "../components/ui/CustomButton";
import CustomHeader from "../components/ui/CustomHeader";
import ScooterIcon from "../components/ui/svg/ScooterIcon";
import SelfPickupIcon from "../components/ui/svg/SelfPickupIcon";
import { HAS_NOTCH, RWF } from "../constant";
import { Route } from "../constant/navigationConstants";
import { getProductInfo } from "../store/settings/settings.selectors";
import { ThemeProps } from "../types/global.types";
import { HomeNavigationProps } from "../types/navigation";

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
      navigation.navigate(Route.navDeliveryAddress);
    } else {
      navigation.navigate(Route.navPayment, {
        deliveryPrice: 0,
        modeOfDelivery: "self_pickup",
      });
    }
  };

  const getDeliveryServiceAmount = (mode: string | undefined) => {
    // we added 50 as a static value
    return mode == "moto" ? 2500 : mode == "cab" ? 10000 : 12000;
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
