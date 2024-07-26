import { View, Text, Platform } from "react-native";
import React, { useState } from "react";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/settings/settings.selectors";
import { ThemeProps } from "../../types/global.types";
import CustomHeader from "../../components/ui/CustomHeader";
import DropShadow from "react-native-drop-shadow";
import RenderSortItemsList from "../../components/ui/RenderSortItemsList";
import { CONDITIONS, PAYMENT_METHOD, SCREEN_WIDTH } from "../../constant";
import Scale from "../../utils/Scale";
import { AppImage } from "../../components/AppImage/AppImage";
import { Images } from "../../assets/images";
import CustomButton from "../../components/ui/CustomButton";
import DoubleRightIcon from "../../components/ui/svg/DoubleRightIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Payment: React.FC<HomeNavigationProps<Route.navPayment>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);

  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHOD);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const RenderItem = ({ title, value }: { title: string; value: string }) => {
    return (
      <View style={style.itemCont}>
        <Text style={style.txtItemTitle}>{title}</Text>
        <Text style={style.txtItemValue}>{value}</Text>
      </View>
    );
  };

  const onPressItem = (index: number) => {
    setSelectedPaymentMethod(paymentMethods[index].title);
    setPaymentMethods(
      paymentMethods.map((item, itemIndex) => ({
        ...item,
        selected: index === itemIndex,
      }))
    );
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Payment" />
      <View style={style.borderCont} />
      <KeyboardAwareScrollView style={style.innerCont}>
        <Text style={style.txtOrderSummary}>Order summary</Text>
        <View style={style.paddingHorizontal}>
          <RenderItem title="Item total" value="R₣ 200" />
          <RenderItem title="Delivery fees" value="R₣ 20" />
          <View style={style.borderCont} />
          <RenderItem title="Total" value="R₣ 220" />
          <View style={style.borderCont} />
        </View>
        <Text style={style.txtOrderSummary}>Payment method</Text>
        <View style={style.paddingHorizontal}>
          <DropShadow style={style.shadow}>
            <View style={style.paymentMethodCont}>
              <RenderSortItemsList
                sortData={paymentMethods}
                onPressItem={onPressItem}
                isBoarderBottom={false}
              />
            </View>
          </DropShadow>
        </View>
        <AppImage
          source={Images.PAYMENT_SECURE}
          resizeMode="contain"
          style={style.paymentSecure}
        />
      </KeyboardAwareScrollView>
      <View style={style.bottomCont}>
        <Text style={style.txtTandC}>
          I accept the general terms of use and the privacy policy and can start
          using zunguka
        </Text>
        <CustomButton
          onPress={() => {}}
          title={"Swipe for quick payment"}
          buttonWidth="full"
          variant="primary"
          type="solid"
          icon={
            <DoubleRightIcon
              color={theme?.colors?.white}
              style={{ marginRight: 10 }}
            />
          }
          iconPosition="left"
        />
      </View>
    </View>
  );
};

export default Payment;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
  },
  scrollCont: {
    flexGrow: 1,
  },
  innerCont: {
    flex: 1,
  },
  borderCont: {
    borderBottomColor: theme?.colors?.border,
    borderBottomWidth: 1,
  },
  txtOrderSummary: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme?.colors?.purple,
    marginLeft: 20,
    marginTop: 20,
  },
  txtItemTitle: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.black,
  },
  txtItemValue: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.bold,
    color: theme?.colors?.black,
  },
  itemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  shadow: {
    shadowColor: theme?.colors?.overlay,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: Platform.OS === "ios" ? 0.3 : 0.1,
    shadowRadius: 3,
    marginTop: 15,
  },
  paymentMethodCont: {
    minHeight: Scale(160),
    backgroundColor: theme?.colors?.white,
    borderRadius: 8,
  },
  paymentSecure: {
    height: Scale(40),
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#E5E7EB",
  },
  bottomCont: {
    marginBottom: props.insets.bottom + 10,
    marginHorizontal: 20,
  },
  txtTandC: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.secondaryText,
    textAlign: "center",
    marginBottom: 30,
  },
}));
