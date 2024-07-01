import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
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
import { getSavedAddress } from "../../../store/settings/settings.selectors";
import { AddAddressProps } from "../../../types/authentication.types";
import { imagePickerProps } from "../../../types/common.types";
import { LoadingState, ThemeProps } from "../../../types/global.types";
import { AuthNavigationProps } from "../../../types/navigation";
import { getUrlExtension } from "../../../utils";
import { userAddress } from "../../../store/authentication/authentication.thunks";
import { selectAuthenticationLoading } from "../../../store/authentication/authentication.selectors";

const YourAddress: React.FC<AuthNavigationProps<Route.navYourAddress>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const savedAddress = useSelector(getSavedAddress);
  const loading = useSelector(selectAuthenticationLoading);

  console.log("savedAddress", savedAddress);

  const [houseImage, setHouseImages] = useState<imagePickerProps[]>([]);
  const [productImageError, setProductImageError] = useState<string>("");
  const [gpsAddress, setGpsAddress] = useState<string>("");
  const [gpsAddressHave, setGpsAddressHave] = useState<number>(0);

  useEffect(() => {
    if (savedAddress) {
      setFieldValue("gpsAddress", savedAddress);
      setGpsAddressHave(1);
    }
  }, [savedAddress]);

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
      streetAddress: "",
      streetAddress1: "",
      country: "",
      city: "",
      zipcode: "",
    },
    onSubmit: async ({
      gpsAddress,
      streetAddress,
      streetAddress1,
      country,
      city,
      zipcode,
    }) => {
      const formData = new FormData();

      formData.append("is_gps_location", `${gpsAddressHave}`);
      formData.append("address", `${gpsAddress}`);
      formData.append("street_address_1", `${streetAddress}`);
      formData.append("street_address_2", `${streetAddress1}`);
      formData.append("country", `${country}`);
      formData.append("city", `${city}`);
      formData.append("zipcode", `${zipcode}`);

      Object.entries(houseImage).forEach(([_key, val]) => {
        formData.append(`house_images[${_key}]`, {
          name:
            val.name ||
            `${new Date().getMilliseconds()}.${getUrlExtension(val.uri)}`,
          type: `image/${getUrlExtension(val.uri)}`,
          uri: Platform.OS === "ios" ? val.uri.replace("file://", "") : val.uri,
        });
      });

      const result = await dispatch(userAddress({ formData: formData }));

      if (userAddress.fulfilled.match(result)) {
        if (result.payload.status === 1) {
          console.log("userAddress result - - - ", result.payload);
          dispatch(setSuccess(result.payload.message));
        }
      } else {
        console.log("userAddress error - - - ", result.payload);
      }
    },
  });

  return (
    <View style={style.container}>
      <CustomHeader title="Your address" />
      <KeyboardAwareScrollView
        contentContainerStyle={style.scrollCont}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={style.txtHouseImage}>House Image</Text>

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
            textInputTitle="Street address"
            placeholder="Street address"
            // onChangeText={handleChange("password")}
            // onBlur={handleBlur("password")}
            // value={values.password}
            // error={errors.password}
            // touched={touched.password}
            returnKeyLabel="next"
            returnKeyType="next"
          />
          <CustomTxtInput
            textInputTitle="Apt, suites, etc"
            placeholder="Apt, suites, etc"
            // onChangeText={handleChange("password")}
            // onBlur={handleBlur("password")}
            // value={values.password}
            // error={errors.password}
            // touched={touched.password}
            returnKeyLabel="next"
            returnKeyType="next"
          />
          <CustomTxtInput
            textInputTitle="City"
            placeholder="City"
            // onChangeText={handleChange("password")}
            // onBlur={handleBlur("password")}
            // value={values.password}
            // error={errors.password}
            // touched={touched.password}
            returnKeyLabel="next"
            returnKeyType="next"
          />
          <CustomTxtInput
            textInputTitle="Country"
            placeholder="Country"
            // onChangeText={handleChange("password")}
            // onBlur={handleBlur("password")}
            // value={values.password}
            // error={errors.password}
            // touched={touched.password}
            returnKeyLabel="next"
            returnKeyType="next"
          />
          <CustomTxtInput
            textInputTitle="Zip Code"
            placeholder="Zip Code"
            // onChangeText={handleChange("password")}
            // onBlur={handleBlur("password")}
            // value={values.password}
            // error={errors.password}
            // touched={touched.password}
            returnKeyLabel="next"
            returnKeyType="next"
          />
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        onPress={() => {
          console.log("houseImage", houseImage);
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
        disabled={!isValid || loading === LoadingState.CREATE}
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
