import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Images } from "../../assets/images";
import { AppImage } from "../../components/AppImage/AppImage";
import AddressDataSheet from "../../components/DeliveryAddress/AddressDataSheet";
import SwipeAnimation from "../../components/SwipeAnimation";
import CustomHeader from "../../components/ui/CustomHeader";
import RenderSortItemsList from "../../components/ui/RenderSortItemsList";
import { PAYMENT_METHOD, SCREEN_WIDTH } from "../../constant";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectUserData } from "../../store/settings/settings.selectors";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import Scale from "../../utils/Scale";
import { determineCardType, getCardImage } from "../../utils";
import SelectCardView from "../../components/Payment/SelectCardView";
import CustomButton from "../../components/ui/CustomButton";
import TermsAndCondition from "../../components/ui/TermsAndCondition";

const Payment: React.FC<HomeNavigationProps<Route.navPayment>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);
  const snapPoints = useMemo(() => ["70%", "70%"], []);
  const sheetRef = useRef<BottomSheet>(null);
  const [checkedReadyToReceive, setReadyToReceive] = React.useState(false);

  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHOD);

  const [cards, setCards] = useState([
    { cardNumber: "4111111111111111", selected: false },
    { cardNumber: "5555555555554444", selected: false },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    "Pay with credit card visa or Master"
  );

  const toggleReadyToReceive = () => setReadyToReceive(!checkedReadyToReceive);

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

  const onPressCard = (index: number) => {
    setSelectedPaymentMethod(paymentMethods[index].title);
    setCards(
      cards.map((item, itemIndex) => ({
        ...item,
        selected: index === itemIndex,
      }))
    );
  };

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const RenderPaymentItems = () => {
    return (
      <View style={style.paymentItemCont}>
        <View style={{ flex: 1 }}>
          <View style={style.savedItemCont}>
            <Text style={style.txtSavedCards}>Saved Cards</Text>
            <SelectCardView
              cards={cards}
              onPressCard={(ind) => onPressCard(ind)}
            />
          </View>
        </View>
        <View style={style.totalCont}>
          <Text style={style.txtTotal}>Total</Text>
          <Text
            style={[style.txtTotal, { fontFamily: theme?.fontFamily?.bold }]}
          >
            R₣ 220
          </Text>
        </View>
        <View style={{ paddingBottom: 10 }}>
          <TermsAndCondition
            checked={checkedReadyToReceive}
            toggleCheckbox={toggleReadyToReceive}
            title="Ready to receive the item."
          />
        </View>
        <CustomButton
          onPress={() => {}}
          title={"Confirm Payment"}
          buttonWidth="full"
          variant="primary"
          type="solid"
        />
      </View>
    );
  };

  const onRight = () => {
    sheetRef.current?.snapToIndex(1);
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
        <SwipeAnimation onRight={onRight} />
      </View>
      <AddressDataSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        title={"Confirm payment"}
        handleClosePress={handleClosePress}
        children={RenderPaymentItems()}
      />
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
  txtSavedCards: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.bold,
    color: theme?.colors?.black,
  },
  paymentItemCont: {
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: props.insets.bottom + 10,
  },
  savedItemCont: { backgroundColor: "#F3F4F6", borderRadius: 8, padding: 10 },
  totalCont: {
    height: 50,
    borderTopColor: theme?.colors?.border,
    borderBottomColor: theme?.colors?.border,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtTotal: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.black,
  },
}));
