import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BackHandler, Platform, Text, TextInput, View } from "react-native";
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
  getSavedLatLng,
  selectUserData,
} from "../../../store/settings/settings.selectors";
import { AddAddressProps } from "../../../types/authentication.types";
import { imagePickerProps } from "../../../types/common.types";
import { LoadingState, ThemeProps } from "../../../types/global.types";
import {
  AuthNavigationProps,
  HomeNavigationProps,
} from "../../../types/navigation";
import { getUrlExtension } from "../../../utils";
import {
  updateUserAddress,
  userAddress,
} from "../../../store/authentication/authentication.thunks";
import { selectAuthenticationLoading } from "../../../store/authentication/authentication.selectors";
import { CommonActions } from "@react-navigation/native";
import { setAdjustPan, setAdjustResize } from "rn-android-keyboard-adjust";
import CheckBoxSelection from "../../../components/ui/CheckBoxSelection";
import CustomDropdown from "../../../components/Dropdown/CustomDropdown";
import { DISTRICT_AND_SECTORS } from "../../../constant";
import { saveLatLng } from "../../../store/settings/settings.slice";
import InputFieldInfo from "../../../components/ui/InputFieldInfo";

const YourAddress: React.FC<HomeNavigationProps<Route.navYourAddress>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const userData = useSelector(selectUserData);

  const from = route?.params?.fromOTP || false;
  const fromUpdateAddress = route?.params?.fromEdit || false;

  const st1Ref = React.useRef<TextInput>(null);
  const cityRef = React.useRef<TextInput>(null);
  const districtRef = React.useRef(null);
  const sectorRef = React.useRef(null);

  const savedAddress = useSelector(getSavedAddress);
  const savedLatLng = useSelector(getSavedLatLng);
  const savedCity = useSelector(getCityAddress);
  const loading = useSelector(selectAuthenticationLoading);

  const admin_address_verification_pending =
    userData?.all_documentation_approved_by_admin == 0;

  const [houseImage, setHouseImages] = useState<imagePickerProps[]>([]);
  const [productImageError, setProductImageError] = useState<string>("");
  const [gpsAddress, setGpsAddress] = useState<string>("");
  const [gpsAddressHave, setGpsAddressHave] = useState<number>(0);
  const [noHouseNumber, setNoHouseNumber] = useState<boolean>(false);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");

  const [sector, setSector] = useState("");
  const [sectorError, setSectorError] = useState("");

  const [sectorData, setSectorData] = useState<
    { title: string; key: string }[]
  >([]);

  useEffect(() => {
    if (district) {
      DISTRICT_AND_SECTORS.map((ele) => {
        if (ele.key == district) {
          setSectorData(ele.sectors);
        }
      });
    }
  }, [district]);

  useEffect(() => {
    const onBackPress = () => {
      if (fromUpdateAddress) {
        navigation.goBack();
        return true;
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Route.navAuthentication }],
          })
        );
        return true;
      }
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [fromUpdateAddress]);

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
    validationSchema: AddAddressScreenSchema(gpsAddressHave, noHouseNumber),
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
      console.log("calleddd");
      const formData = new FormData();
      const is_house_num = noHouseNumber ? 0 : 1;
      formData.append("is_gps_location", `${gpsAddressHave}`);
      formData.append("address", `${gpsAddress || "kigali"}`);
      formData.append("house_number", `${houseNumber}`);
      formData.append("is_house_number", `${is_house_num}`);
      formData.append("street_number", `${streetNumber}`);
      formData.append("district", `${district}`);
      formData.append("sector", `${sector}`);
      formData.append("latitude", `${savedLatLng.lat}`);
      formData.append("longitude", `${savedLatLng.lng}`);

      // Object.entries(houseImage).forEach(([_key, val]) => {
      //   formData.append(`house_images[${_key}]`, {
      //     name:
      //       val.name ||
      //       `${new Date().getMilliseconds()}.${getUrlExtension(val.uri)}`,
      //     type: `image/${getUrlExtension(val.uri)}`,
      //     uri: Platform.OS === "ios" ? val.uri.replace("file://", "") : val.uri,
      //   });
      // });
      console.log("formData", JSON.stringify(formData));

      if (fromUpdateAddress) {
        const result = await dispatch(
          updateUserAddress({ formData: formData })
        );

        if (updateUserAddress.fulfilled.match(result)) {
          if (result.payload.status === 1) {
            console.log("updateUserAddress result - - - ", result.payload);
            dispatch(setSuccess(result.payload.message));
          }
        } else {
          console.log("updateUserAddress error - - - ", result.payload);
        }
      } else {
        const result = await dispatch(userAddress({ formData: formData }));

        if (userAddress.fulfilled.match(result)) {
          if (result.payload.status === 1) {
            console.log("userAddress result - - - ", result.payload);
            dispatch(setSuccess(result.payload.message));
            navigation.navigate(Route.navAddKyc, { fromOTP: false });
          }
        } else {
          console.log("userAddress error - - - ", result.payload);
        }
      }
    },
  });

  useEffect(() => {
    if (fromUpdateAddress && userData) {
      if (userData?.house_images?.length > 0) {
        // setHouseImages(userData?.house_images);
      }

      if (userData?.house_number) {
        console.log("userData?.house_number", userData?.house_number);
        setFieldValue("houseNumber", userData?.house_number);
      }
      if (userData?.is_house_number) {
        console.log("userData?.is_house_number", userData?.is_house_number);

        setNoHouseNumber(userData?.is_house_number == 1 ? false : true);
      }
      if (userData?.street_number) {
        setFieldValue("streetNumber", userData?.street_number);
      }
      if (userData?.address) {
        setFieldValue("gpsAddress", userData?.address);
        setGpsAddressHave(1);
      }
      if (userData?.latitude || userData?.longitude) {
        dispatch(
          saveLatLng({
            lat: Number(userData?.latitude),
            lng: Number(userData?.longitude),
          })
        );
      }

      if (userData?.district) {
        setDistrict(userData?.district);
        const findDistrictIndex = DISTRICT_AND_SECTORS.findIndex(
          (ele) => ele.title == userData?.district
        );
        districtRef?.current?.selectIndex(findDistrictIndex);
        setFieldValue("district", userData?.district);
        setSelectedDistrict(userData?.district);
      }

      if (userData?.sector) {
        let sectors: any[] = [];

        DISTRICT_AND_SECTORS.map((ele) => {
          if (ele.key == userData?.district) {
            sectors = ele.sectors;
            setSectorData(ele.sectors);
          }
        });

        const findSectorIndex = sectors?.findIndex(
          (ele) => ele.title == userData?.sector
        );
        console.log("findSectorIndex", findSectorIndex);

        sectorRef?.current?.selectIndex(findSectorIndex);
        setFieldValue("sector", userData?.sector);
        setSelectedSector(userData?.sector);
        setSector(userData?.sector);
        setSector({ key: userData?.sector, title: userData?.sector });
      }
    }
  }, [fromUpdateAddress, userData]);

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

  // useEffect(() => {
  //   console.log("values.houseNumber", values.houseNumber);
  //   values.houseNumber !== ""
  //     ? setNoHouseNumber(false)
  //     : setNoHouseNumber(true);
  // }, [values.houseNumber]);

  useEffect(() => {
    console.log("noHouseNumber", noHouseNumber);
    noHouseNumber && setFieldValue("houseNumber", "");
  }, [noHouseNumber]);

  const handleCheckboxChange = () => {
    setNoHouseNumber(!noHouseNumber);
  };

  const onSelectDistrict = (val: {
    title: string;
    key: string;
    id: string;
  }) => {
    setDistrictError("");
    setDistrict(val.key);
    setFieldValue("district", val.key);
    setSelectedDistrict(val.key);
  };

  const onSelectSector = (val: { title: string; key: string; id: string }) => {
    setSectorError("");
    setSector(val.key);
    setFieldValue("sector", val.key);
    setSelectedSector(val.key);
  };

  const checkDistrictAndSector = async () => {
    if (
      selectedDistrict &&
      selectedDistrict !== "" &&
      selectedSector &&
      selectedSector !== ""
    ) {
      return true;
    } else {
      if (selectedDistrict == "" && selectedSector == "") {
        setDistrictError("Please select the district.");
        setSectorError("Please select the sector.");
        return false;
      } else if (selectedDistrict == "") {
        setDistrictError("Please select the district.");
        return false;
      } else if (selectedSector == "") {
        setSectorError("Please select the sector.");
        return false;
      }
    }
  };

  return (
    <View style={style.container}>
      <CustomHeader
        title={fromUpdateAddress ? "Update address" : "Your address"}
        isOutsideBack={true}
        onPressBackBtn={onPressBack}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={style.scrollCont}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
      >
        {/* <Text style={style.txtHouseImage}>
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
        )} */}
        <View style={style.inputCont}>
          <CustomTxtInput
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
          <InputFieldInfo
            text={
              "To ensure a safe and secure marketplace for everyone, we kindly ask for your privacy information as part of our KYC process. Rest assured, these details will be kept strictly confidential and will never be disclosed to other users, helping to create a trusted environment for buying and selling with confidence."
            }
          />
          <Text style={style.txtManualAddress}>Manual Address</Text>
          <CustomTxtInput
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
          <CheckBoxSelection
            isChecked={noHouseNumber}
            onPressCheckbox={handleCheckboxChange}
            itemName={"My house has no house/gate number"}
            itemValue={"My house has no house/gate number"}
            containerStyle={style.checkCont}
            textStyle={style.txtCheckCont}
            iconSize={22}
          />
          <CustomTxtInput
            ref={st1Ref}
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
          <CustomDropdown
            ref={districtRef}
            dropDownData={DISTRICT_AND_SECTORS}
            placeHolder={"District"}
            value={district}
            topMargin={15}
            onSelect={onSelectDistrict}
            error={districtError}
          />
          <CustomDropdown
            ref={sectorRef}
            dropDownData={sectorData}
            placeHolder={"Sector"}
            value={sector}
            topMargin={20}
            onSelect={onSelectSector}
            error={sectorError}
          />
          {/* <CustomTxtInput
            ref={cityRef}
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
            placeholder="District name"
            onChangeText={handleChange("district")}
            onBlur={handleBlur("district")}
            value={values.district}
            error={errors.district}
            touched={touched.district}
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => zipRef.current?.focus()}
          /> */}
        </View>
      </KeyboardAwareScrollView>
      {fromUpdateAddress && (
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <InputFieldInfo
            text={
              admin_address_verification_pending
                ? "Your profile is under review..."
                : "Updating your address will require re-verification, temporarily disabling your ability to buy or sell products until verified by admin."
            }
          />
        </View>
      )}
      <CustomButton
        onPress={async () => {
          // if (houseImage?.length > 0) {
          if (await checkDistrictAndSector()) {
            handleSubmit();
          }
          // } else {
          //   // setProductImageError("Please add your house image.");
          //   dispatch(
          //     setErrors({
          //       message: "Please add your house image.",
          //       status: 0,
          //       statusCode: null,
          //     })
          //   );
          // }
        }}
        title={fromUpdateAddress ? "Update" : "Continue"}
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
  checkCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  txtCheckCont: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.textPrimary,
  },
}));
