import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Platform, TextInput, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { setAdjustPan, setAdjustResize } from "rn-android-keyboard-adjust";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AddCardFormProps } from "../../types/transaction.types";
import { AddCardScreenSchema } from "../../constant/formValidations";
import { CreditDebitCardNumber, determineCardType } from "../../utils";
import CustomHeader from "../../components/ui/CustomHeader";
import CardView from "../../components/Payment/CardView";
import { CustomTxtInput } from "../../components/ui/CustomTextInput";
import { HAS_NOTCH, SCREEN_WIDTH } from "../../constant";
import CustomButton from "../../components/ui/CustomButton";
import { LoadingState, ThemeProps } from "../../types/global.types";
import { selectPaymentCardLoading } from "../../store/PaymentCard/paymentCard.selectors";
import Scale from "../../utils/Scale";
import { Images } from "../../assets/images";

const AddCard: React.FC<HomeNavigationProps<Route.navAddCard>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const cardNumberRef = React.useRef<TextInput>(null);
  const expDateRef = React.useRef<TextInput>(null);
  const cvvRef = React.useRef<TextInput>(null);

  const dispatch = useAppDispatch();
  const loading = useSelector(selectPaymentCardLoading);

  useEffect(() => {
    setAdjustResize();
    return () => {
      setAdjustPan();
    };
  }, []);

  const onPressAddCard = () => {};

  const {
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    isValid,
    handleSubmit,
    setFieldValue,
  } = useFormik<AddCardFormProps>({
    validationSchema: AddCardScreenSchema,
    initialValues: { cardName: "", cardNumber: "", expiryDate: "", cvv: "" },
    onSubmit: async ({ cardName, cardNumber, expiryDate, cvv }) => {
      const expdate = expiryDate.split("/");

      // try {
      //   const result = await dispatch(
      //     AddNewCard({
      //       card_holder_name: cardName,
      //       card_no: cardNumber,
      //       exp_month: expdate[0],
      //       exp_year: expdate[1],
      //       cvv_no: cvv,
      //     })
      //   );
      //   if (AddNewCard.fulfilled.match(result)) {
      //     if (result.payload?.status === 1) {
      //       dispatch(setSuccess(result.payload?.message));
      //       navigation.goBack();
      //     }
      //   } else {
      //     console.log("errror AddNewCard --->", result.payload);
      //   }
      // } catch (error) {
      //   console.log("errror AddNewCard --->", error);
      // }
    },
  });

  const fixCardText = (text: string) => {
    if (text.length == 2 && values.expiryDate.length == 1) {
      text += "/";
    } else if (text.length == 2 && values.expiryDate.length == 3) {
      text = text.substring(0, text.length - 1);
    }
    setFieldValue("expiryDate", text);
  };

  const cardType = determineCardType(values.cardNumber);
  return (
    <View style={style.container}>
      <CustomHeader title="New Card" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={style.txtInCont}
      >
        <CardView
          source={Images.CARD1}
          cardName={values.cardName || "Enter the name on card"}
          cardNumber={
            CreditDebitCardNumber(values.cardNumber) || "••••  ••••  ••••  8557"
          }
          expiryDate={values.expiryDate || "__ /__"}
          upperTextColor={theme.colors?.black}
          bottomTextColor={theme.colors?.black}
          cardType={cardType}
        />
        <View style={{ marginHorizontal: 20 }}>
          <CustomTxtInput
            placeholder="Enter name on card"
            placeholderTextColor={"#DBDADC"}
            returnKeyType="next"
            returnKeyLabel="next"
            keyboardType={"default"}
            onChangeText={handleChange("cardName")}
            onBlur={handleBlur("cardName")}
            value={values.cardName}
            error={errors.cardName}
            touched={touched.cardName}
            onSubmitEditing={() => cardNumberRef.current?.focus()}
            textInputStyle={style.textIn}
            style={style.textInText}
          />
          <CustomTxtInput
            ref={cardNumberRef}
            placeholder="Enter card number"
            placeholderTextColor={"#DBDADC"}
            returnKeyType="next"
            returnKeyLabel="next"
            keyboardType={"number-pad"}
            onChangeText={handleChange("cardNumber")}
            onBlur={handleBlur("cardNumber")}
            value={values.cardNumber}
            error={errors.cardNumber}
            touched={touched.cardNumber}
            maxLength={16}
            onSubmitEditing={() => expDateRef.current?.focus()}
            textInputStyle={style.textIn}
            style={style.textInText}
          />
          <View style={style.innerTextInCont}>
            <View style={{ flexDirection: "column" }}>
              <CustomTxtInput
                ref={expDateRef}
                placeholder="Expiry date"
                placeholderTextColor={"#DBDADC"}
                returnKeyType="next"
                returnKeyLabel="next"
                keyboardType={"phone-pad"}
                onChangeText={(text) => {
                  fixCardText(text);
                }}
                onBlur={handleBlur("expiryDate")}
                value={values.expiryDate}
                error={errors.expiryDate}
                touched={touched.expiryDate}
                onSubmitEditing={() => cvvRef.current?.focus()}
                textInputStyle={[
                  style.textIn,
                  {
                    width: SCREEN_WIDTH / 2 - 30,
                  },
                ]}
                style={style.textInText}
                isBehindFields={true}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <CustomTxtInput
                ref={cvvRef}
                placeholder="Cvv"
                placeholderTextColor={"#DBDADC"}
                returnKeyType="next"
                returnKeyLabel="next"
                keyboardType={"number-pad"}
                onChangeText={handleChange("cvv")}
                onBlur={handleBlur("cvv")}
                maxLength={cardType == "american-express" ? 4 : 3}
                value={values.cvv}
                error={errors.cvv}
                touched={touched.cvv}
                textInputStyle={[
                  style.textIn,
                  {
                    width: SCREEN_WIDTH / 2 - 30,
                  },
                ]}
                style={style.textInText}
                isBehindFields={true}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={style.bottomCont}>
        <CustomButton
          disabled={!isValid || loading === LoadingState.CREATE}
          loading={loading === LoadingState.CREATE}
          onPress={() => {
            handleSubmit();
          }}
          title={"Add Card"}
          buttonWidth="full"
          variant="primary"
          type="solid"
        />
      </View>
    </View>
  );
};

export default AddCard;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: props.insets.top,
  },
  container: {
    flex: 1,
    paddingTop: props.insets.top,
    backgroundColor: theme.colors?.background,
  },
  bottomCont: {
    paddingBottom:
      Platform.OS === "ios"
        ? HAS_NOTCH
          ? props.insets.bottom
          : props.insets.bottom + 10
        : props.insets.bottom + 10,
  },
  txtInCont: {
    flex: 1,
    marginTop: 10,
  },
  textIn: {
    borderColor: "#DBDADC",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    flex: 1,
    height: Scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  textInText: {
    color: theme.colors?.textPrimary,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs16,
    flex: 1,
  },
  innerTextInCont: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  error: {
    marginTop: 5,
    fontSize: theme.fontSize?.fs12,
    color: theme.colors?.error,
    width: SCREEN_WIDTH / 2 - 30,
  },
  imgCard: {
    height: Scale(270),
    width: SCREEN_WIDTH,
    resizeMode: "contain",
  },
  txtCreditCard: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
  },
  bottomViewonCard: {
    position: "absolute",
    bottom: 20,
    marginHorizontal: 40,
    marginBottom: 30,
    width: "80%",
  },
  txtCardItems: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
  },
}));
