import BottomSheet from "@gorhom/bottom-sheet";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { PayWithFlutterwave } from "flutterwave-react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Platform, StatusBar, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AddressDataSheet from "../../components/DeliveryAddress/AddressDataSheet";
import SelectCardView from "../../components/Payment/SelectCardView";
import CustomButton from "../../components/ui/CustomButton";
import CustomHeader from "../../components/ui/CustomHeader";
import TermsAndCondition from "../../components/ui/TermsAndCondition";
import {
  FW_PUBLIC_KEY,
  FW_SECRET_KEY,
  PAYMENT_METHOD,
  RWF,
  SCREEN_WIDTH,
} from "../../constant";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  getProductInfo,
  getSelectedDeliveryAddress,
  selectUserData,
} from "../../store/settings/settings.selectors";
import { LoadingState, ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { notifyMessage } from "../../utils/notifyMessage";
import Scale from "../../utils/Scale";
import { userPayDepositSeller } from "../../store/PaymentCard/paymentCard.thunk";
import DropShadow from "react-native-drop-shadow";
import RenderSortItemsList from "../../components/ui/RenderSortItemsList";
import { AppImage } from "../../components/AppImage/AppImage";
import { Images } from "../../assets/images";
import SelectPaymentMethod from "../../components/ui/SelectPaymentMethod";
import { selectPaymentCardLoading } from "../../store/PaymentCard/paymentCard.selectors";
import {
  setProductInfo,
  setSelectedDeliveryAddress,
} from "../../store/settings/settings.slice";

interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

const Payment: React.FC<HomeNavigationProps<Route.navPayment>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);
  const productInfo = useSelector(getProductInfo);
  const deliveryAddress = useSelector(getSelectedDeliveryAddress);
  const loading = useSelector(selectPaymentCardLoading);

  const { deliveryPrice, modeOfDelivery } = route.params;
  const snapPoints = useMemo(() => ["70%", "70%"], []);
  const sheetRef = useRef<BottomSheet>(null);

  const [checkedReadyToReceive, setReadyToReceive] = React.useState(false);
  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHOD);
  const [cards, setCards] = useState([
    { cardNumber: "4111111111111111", selected: false },
    { cardNumber: "5555555555554444", selected: false },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("mobile_money");
  const [productPrice, setProductPrice] = useState("");
  const [transportFee, setTransportFee] = useState("");
  const [totalPrice, setTotalPrice] = useState("0");
  const [outOfKigali, setOutOfKigali] = useState(false);

  useEffect(() => {
    if (productInfo) {
      setProductPrice(`${productInfo?.price}`);
      if (productInfo?.isOutOfKigali) {
        setOutOfKigali(true);
        setTotalPrice(Number(productInfo?.price).toFixed(2));
      } else {
        let price1 = (Number(productInfo?.price) * 5) / 100;
        setTransportFee(price1.toFixed(2));
        setTotalPrice(
          (Number(productInfo?.price) + price1 + Number(deliveryPrice)).toFixed(
            2
          )
        );
        setOutOfKigali(false);
      }
    }
  }, [productInfo]);

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
    setSelectedPaymentMethod(paymentMethods[index].type);
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
            {RWF} {totalPrice}
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

  const handleOnRedirect = async (data: RedirectParams) => {
    console.log("data", data);
    if (data.status == "successful") {
      paymentDepositSeller(data);
      // const endpoint = "https://api.flutterwave.com/v3/transfers";

      // const data = {
      //   account_bank: "MPS", // Replace with the recipient's bank code
      //   account_number: productInfo?.sellerPhone || 250738923170, // Replace with the recipient's account number
      //   amount: Number(productPrice), // Replace with the amount to be transferred
      //   currency: "RWF", // Replace with the currency
      //   narration: `Payment for ${productInfo?.name}`,
      //   beneficiary_name: productInfo?.sellerName,
      // };

      // const headers = {
      //   Authorization: `Bearer ${FW_SECRET_KEY}`,
      //   "Content-Type": "application/json",
      // };

      // axios
      //   .post(endpoint, data, {
      //     headers: headers,
      //   })
      //   .then((response) => {
      //     console.log("Transfer result - - - ->", response.data);
      //   })
      //   .catch((error) => {
      //     console.log("error - - - ", error.response.data);
      //     notifyMessage(error.response.data.message);
      //   });
      // notifyMessage("Payment Successfully");
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: Route.navCongratulations1 }],
      //   })
      // );
    } else {
      if (data.status == "cancelled") {
        notifyMessage("User cancelled the payment!");
      }
    }
  };

  const paymentDepositSeller = async (data: RedirectParams | null) => {
    const formData = new FormData();
    formData.append("item_id", productInfo?.id);
    modeOfDelivery && formData.append("mode_of_delivery", modeOfDelivery);
    formData.append("mode_of_payment", selectedPaymentMethod);

    formData.append("delivery_address_id", deliveryAddress);
    deliveryPrice && formData.append("delivery_price", deliveryPrice);
    data &&
      data?.transaction_id &&
      formData.append("transaction_id", data.transaction_id);
    data && data.tx_ref && formData.append("tx_ref", data.tx_ref);

    console.log("formData", JSON.stringify(formData));

    const result = await dispatch(userPayDepositSeller({ formData: formData }));
    if (userPayDepositSeller.fulfilled.match(result)) {
      if (result.payload.status === 1) {
        console.log("userPayDepositSeller result - - - ", result.payload);
        notifyMessage("Payment Successfully");
        dispatch(
          setProductInfo({
            id: null,
            price: null,
            isOutOfKigali: false,
            modeOfTransport: "",
            name: "",
            sellerName: "",
            sellerPhone: "",
          })
        );
        dispatch(setSelectedDeliveryAddress(null));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Route.navCongratulations1 }],
          })
        );
      }
    } else {
      console.log("userPayDepositSeller error - - - ", result.payload);
    }
  };

  const generateTransactionRef = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("result", result);
    return `flw_tx_ref_${result}`;
  };

  return (
    <View style={style.container}>
      <StatusBar barStyle={"dark-content"} />
      <CustomHeader title="Payment" />
      <View style={style.borderCont} />
      <KeyboardAwareScrollView style={style.innerCont}>
        <Text style={style.txtOrderSummary}>Order summary</Text>
        <View style={style.paddingHorizontal}>
          <RenderItem
            title="Item total"
            value={`${RWF} ${Number(productInfo?.price).toFixed(2)}`}
          />
          {!outOfKigali && modeOfDelivery !== "" && (
            <>
              <RenderItem
                title="Delivery fees"
                value={`${RWF} ${deliveryPrice}`}
              />
            </>
          )}
          {!outOfKigali && (
            <>
              <RenderItem
                title="Transport fee (5%)"
                value={`${RWF} ${transportFee}`}
              />
              <View style={style.borderCont} />
            </>
          )}

          <RenderItem title="Total" value={`${RWF} ${totalPrice}`} />
          <View style={style.borderCont} />
        </View>
        <Text style={style.txtOrderSummary}>Payment method</Text>
        <View style={style.paddingHorizontal}>
          <DropShadow style={style.shadow}>
            <View style={style.paymentMethodCont}>
              <SelectPaymentMethod
                sortData={paymentMethods}
                onPressItem={onPressItem}
                isBoarderBottom={false}
                totalUsersEarning={`${userData?.total_earning}`}
                totalAmount={totalPrice}
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
        {/* <SwipeAnimation onRight={onRight} /> */}
        <PayWithFlutterwave
          onRedirect={handleOnRedirect}
          options={{
            tx_ref: generateTransactionRef(10),
            authorization: FW_PUBLIC_KEY,
            customer: {
              email: userData?.email,
              name: userData?.username,
              phonenumber: userData?.phone_number,
            },
            amount: Number(totalPrice),
            currency: "RWF",
            payment_options: "card",
          }}
          style={{ paddingHorizontal: 20 }}
          customButton={(props) => (
            <CustomButton
              onPress={() => {
                if (selectedPaymentMethod !== "") {
                  if (selectedPaymentMethod == "earning") {
                    paymentDepositSeller(null);
                  } else {
                    props.onPress();
                  }
                } else {
                  notifyMessage("Please select the Payment method");
                }
              }}
              title={"Payment"}
              disabled={props.disabled || loading === LoadingState.CREATE}
              loading={props.disabled || loading === LoadingState.CREATE}
              buttonWidth="full"
              variant="primary"
              type="solid"
            />
          )}
        />
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
