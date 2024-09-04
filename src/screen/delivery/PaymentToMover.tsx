import React from "react";
import { Platform, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";

import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import Scale from "../../utils/Scale";
import PickupDeliveryCont from "../../components/PickupDeliveryCont";
import { Route } from "../../constant/navigationConstants";
import CustomHeader from "../../components/ui/CustomHeader";
import { HAS_NOTCH } from "../../constant";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import CustomButton from "../../components/ui/CustomButton";

const PaymentToMover: React.FC<
  HomeNavigationProps<Route.navPaymentToMover>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const pickup_address = route?.params?.pickup_Address;
  const delivery_address = route?.params?.delivery_Address;
  const package_details_id = route?.params?.package_details_id;
  const price = route?.params?.price;
  const item_name = route?.params?.item_name;

  const onPressPayment = () => {
    navigation.navigate(Route.navPayMover, {
      package_details_id,
      price,
    });
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Payment To Mover" />
      <View style={style.innerCont}>
        <View style={style.itemCont}>
          <View style={style.priceCont}>
            <Text style={style.txtInputPrice}>
              Delivery Price for {item_name}
            </Text>
            <Text style={style.txtPrice}>$ {price}</Text>
          </View>
          <PickupDeliveryCont
            pickupAddress={pickup_address}
            deliveryAddress={delivery_address}
          />
        </View>
      </View>

      <CustomButton
        onPress={onPressPayment}
        //   disabled={!isValid}
        title={"Payment"}
        buttonWidth="full"
        variant="primary"
        type="solid"
      />
    </View>
  );
};

export default PaymentToMover;

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
    paddingTop: 50,
  },
  priceCont: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
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
    alignSelf: "flex-start",
  },
  itemCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
