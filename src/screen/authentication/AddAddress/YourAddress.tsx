import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import UploadPhotos from "../../../components/UploadPhotos";
import CustomButton from "../../../components/ui/CustomButton";
import CustomHeader from "../../../components/ui/CustomHeader";
import { CustomTxtInput } from "../../../components/ui/CustomTextInput";
import LocationIcon from "../../../components/ui/svg/LocationIcon";
import { AddAddressScreenSchema } from "../../../constant/formValidations";
import { Route } from "../../../constant/navigationConstants";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setErrors, setSuccess } from "../../../store/global/global.slice";
import {
  getCityAddress,
  getSavedAddress,
} from "../../../store/settings/settings.selectors";
import { AddAddressProps } from "../../../types/authentication.types";
import { imagePickerProps } from "../../../types/common.types";
import { LoadingState, ThemeProps } from "../../../types/global.types";
import { AuthNavigationProps } from "../../../types/navigation";
import { getUrlExtension } from "../../../utils";
import { userAddress } from "../../../store/authentication/authentication.thunks";
import { selectAuthenticationLoading } from "../../../store/authentication/authentication.selectors";
import { CommonActions } from "@react-navigation/native";
import { setAdjustPan, setAdjustResize } from "rn-android-keyboard-adjust";

const YourAddress: React.FC<AuthNavigationProps<Route.navYourAddress>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const from = route?.params?.fromOTP || false;

  const st1Ref = React.useRef<TextInput>(null);
  const cityRef = React.useRef<TextInput>(null);
  const countryRef = React.useRef<TextInput>(null);
  const zipRef = React.useRef<TextInput>(null);

  const savedAddress = useSelector(getSavedAddress);
  const savedCity = useSelector(getCityAddress);
  const loading = useSelector(selectAuthenticationLoading);

  const [houseImage, setHouseImages] = useState<imagePickerProps[]>([]);
  const [productImageError, setProductImageError] = useState<string>("");
  const [gpsAddress, setGpsAddress] = useState<string>("");
  const [gpsAddressHave, setGpsAddressHave] = useState<number>(0);

  useEffect(() => {
    setAdjustResize();
    return () => {
      setAdjustPan();
    };
  }, []);

  useEffect(() => {
    if (savedAddress) {
      setFieldValue("gpsAddress", savedAddress);
      setGpsAddressHave(1);
    }
    if (savedCity) {
      setFieldValue("district", savedCity);
    } else {
      const words = savedAddress.split(",");
      // Check if there are at least two words (to ensure a second last word exists)
      if (words.length >= 2) {
        // Access the second last element using the negative second index (-2)
        const secondLastWord = words[words.length - 2];
        console.log("Second Last Word:", secondLastWord);
        setFieldValue("district", secondLastWord);
      }
    }
  }, [savedAddress, savedCity]);

  const onPressGPSAddress = () => {
    navigation.navigate(Route.navChooseAddress);
  };

  const {
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    isValid,
    handleSubmit,
    setFieldValue,
  } = useFormik<AddAddressProps>({
    validationSchema: AddAddressScreenSchema(gpsAddressHave),
    initialValues: {
      gpsAddress,
      houseNumber: "",
      streetNumber: "",
      sector: "",
      district: "",
    },
    onSubmit: async ({
      gpsAddress,
      houseNumber,
      streetNumber,
      sector,
      district,
    }) => {
      const formData = new FormData();

      formData.append("is_gps_location", `${gpsAddressHave}`);
      formData.append("address", `${gpsAddress}`);
      formData.append("house_number", `${houseNumber}`);
      formData.append("street_number", `${streetNumber}`);
      formData.append("district", `${district}`);
      formData.append("sector", `${sector}`);

      Object.entries(houseImage).forEach(([_key, val]) => {
        formData.append(`house_images[${_key}]`, {
          name:
            val.name ||
            `${new Date().getMilliseconds()}.${getUrlExtension(val.uri)}`,
          type: `image/${getUrlExtension(val.uri)}`,
          uri: Platform.OS === "ios" ? val.uri.replace("file://", "") : val.uri,
        });
      });
      console.log("formData", JSON.stringify(formData));
      const result = await dispatch(userAddress({ formData: formData }));

      if (userAddress.fulfilled.match(result)) {
        if (result.payload.status === 1) {
          console.log("userAddress result - - - ", result.payload);
          dispatch(setSuccess(result.payload.message));
          navigation.navigate(Route.navAddKyc);
        }
      } else {
        console.log("userAddress error - - - ", result.payload);
      }
    },
  });

  const onPressBack = () => {
    if (navigation.canGoBack() && !from) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Route.navAuthentication }],
        })
      );
    }
  };

  console.log("district", values.district);

  return (
    <View style={style.container}>
      <CustomHeader
        title="Your address"
        isOutsideBack={true}
        onPressBackBtn={onPressBack}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={style.scrollCont}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={style.txtHouseImage}>
          Image of House apperance or Gate
        </Text>

        <UploadPhotos
          navigation={navigation}
          images={houseImage}
          setImages={(val) => {
            setProductImageError("");
            setHouseImages(val);
          }}
        />
        {productImageError && (
          <Text style={style.error}>{productImageError}</Text>
        )}
        <View style={style.inputCont}>
          <CustomTxtInput
            textInputTitle="GPS Address"
            placeholder="GPS Address"
            onChangeText={handleChange("gpsAddress")}
            onBlur={handleBlur("gpsAddress")}
            value={values.gpsAddress}
            error={errors.gpsAddress}
            touched={touched.gpsAddress}
            returnKeyLabel="done"
            returnKeyType="done"
            iconPosition={"right"}
            onPress={onPressGPSAddress}
            onPressIn={onPressGPSAddress}
            editable={false}
            icon={<LocationIcon color={theme?.colors?.black} />}
          />
          <Text style={style.txtManualAddress}>Manual Address</Text>
          <CustomTxtInput
            textInputTitle="House number"
            placeholder="House number (Ex. 401)"
            onChangeText={handleChange("houseNumber")}
            onBlur={handleBlur("houseNumber")}
            keyboardType="number-pad"
            value={values.houseNumber}
            error={errors.houseNumber}
            touched={touched.houseNumber}
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => st1Ref.current?.focus()}
          />
          <CustomTxtInput
            ref={st1Ref}
            textInputTitle="Street number"
            placeholder="Street number (Ex. 5 KN 27 Street)"
            onChangeText={handleChange("streetNumber")}
            onBlur={handleBlur("streetNumber")}
            value={values.streetNumber}
            error={errors.streetNumber}
            touched={touched.streetNumber}
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => cityRef.current?.focus()}
          />
          <CustomTxtInput
            ref={cityRef}
            textInputTitle="Sector name"
            placeholder="Sector name"
            onChangeText={handleChange("sector")}
            onBlur={handleBlur("sector")}
            value={values.sector}
            error={errors.sector}
            touched={touched.sector}
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => countryRef.current?.focus()}
          />
          <CustomTxtInput
            ref={countryRef}
            textInputTitle="District name"
            placeholder="District name"
            onChangeText={handleChange("district")}
            onBlur={handleBlur("district")}
            value={values.district}
            error={errors.district}
            touched={touched.district}
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => zipRef.current?.focus()}
          />
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        onPress={() => {
          if (houseImage?.length > 0) {
            handleSubmit();
          } else {
            setProductImageError("Please add your house image.");
            dispatch(
              setErrors({
                message: "Please add your house image.",
                status: 0,
                statusCode: null,
              })
            );
          }
        }}
        title={"Continue"}
        buttonWidth="full"
        variant="primary"
        type="solid"
        disabled={loading === LoadingState.CREATE}
        loading={loading === LoadingState.CREATE}
      />
    </View>
  );
};

export default YourAddress;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.background,
    paddingTop: props.insets.top,
    paddingBottom: props.insets.bottom + 10,
  },
  scrollCont: {
    flexGrow: 1,
  },
  txtHouseImage: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    marginLeft: 20,
    marginVertical: 10,
  },
  txtManualAddress: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginTop: 20,
    marginBottom: 10,
  },
  inputCont: {
    marginHorizontal: 20,
    flex: 1,
    marginTop: 10,
  },
  error: {
    marginTop: 5,
    fontSize: theme.fontSize?.fs12,
    color: theme.colors?.error,
    fontFamily: theme.fontFamily?.regular,
    marginLeft: 20,
  },
}));
