import BottomSheet from "@gorhom/bottom-sheet";
import { useFormik } from "formik";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CountryCode,
  TranslationLanguageCodeMap,
} from "react-native-country-picker-modal";
import { makeStyles, useTheme } from "react-native-elements";
import ReactNativePhoneInput from "react-native-phone-input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddressDataSheet from "../../components/DeliveryAddress/AddressDataSheet";
import DeliveryAddressList from "../../components/DeliveryAddress/DeliveryAddressList";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";
import CountryPickerModal from "../../components/ui/CountryPickerModal";
import CustomButton from "../../components/ui/CustomButton";
import CustomHeader from "../../components/ui/CustomHeader";
import { CustomTxtInput } from "../../components/ui/CustomTextInput";
import { PhoneNumberInput } from "../../components/ui/PhoneNumberInput";
import LocationIcon from "../../components/ui/svg/LocationIcon";
import SinglePlusIcon from "../../components/ui/svg/SinglePlusIcon";
import {
  AddressData,
  BASE_URL,
  CITIES,
  GOOGLE_MAP_API_KEY,
  MAX_CHAR_LENGTH,
  SCREEN_WIDTH,
  secureStoreKeys,
} from "../../constant";
import { DeliveryAddressScreenSchema } from "../../constant/formValidations";
import { Route } from "../../constant/navigationConstants";
import { DeliveryAddressFormProps } from "../../types/deliveryaddress.types";
import { LoadingState, ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import Scale from "../../utils/Scale";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setErrors } from "../../store/global/global.slice";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import {
  userDeliveryAddress,
  userUpdateDeliveryAddress,
} from "../../store/PaymentCard/paymentCard.thunk";
import { useSelector } from "react-redux";
import { selectPaymentCardLoading } from "../../store/PaymentCard/paymentCard.selectors";
import CheckBoxSelection from "../../components/ui/CheckBoxSelection";
import { getData } from "../../utils/asyncStorage";
import { API } from "../../constant/apiEndpoints";
import { DeliveryAddressDataProps } from "../../types/payment.types";
import {
  setProductInfo,
  setSelectedDeliveryAddress,
} from "../../store/settings/settings.slice";

const DeliveryAddress: React.FC<
  HomeNavigationProps<Route.navDeliveryAddress>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const sheetRef = useRef<BottomSheet>(null);
  const regionRef = useRef(null);
  const cityRef = useRef(null);
  const firstNameRef = React.useRef<TextInput>(null);
  const lastnameRef = React.useRef<TextInput>(null);
  const phoneRef = React.useRef<ReactNativePhoneInput>(null);
  const deliveryAddressRef = React.useRef<TextInput>(null);

  const snapPoints = useMemo(() => ["90%", "90%"], []);

  const dispatch = useAppDispatch();

  const loading = useSelector(selectPaymentCardLoading);

  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [visibleCountryPicker, setVisibleCountryPicker] =
    useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<CountryCode>("RW");
  const [country, setCountry] = useState<string | TranslationLanguageCodeMap>(
    ""
  );
  const [loader, setLoader] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");

  const [tamp_phone, setTamp_phone] = useState<string>("");
  const [makeDefault, setMakeDefault] = useState<number>(0);

  const [deliveryAddress, setDeliveryAddress] = useState<
    DeliveryAddressDataProps[]
  >([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [editOn, setEditOn] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSavedAddress(10, 1, true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getSavedAddress = async (
    limit: number,
    page: number,
    refresh: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_SAVED_DELIVERY_ADDRESS}/${limit}/${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      // Handle the fetched data here
      if (data && data?.data?.data?.length > 0) {
        setIsLoading(false);
        data?.data?.data.forEach((ele: DeliveryAddressDataProps) => {
          if (ele.is_default == 1) {
            setSelectedAddress(ele.id);
          }
        });
        refresh
          ? setDeliveryAddress([...data?.data?.data])
          : setDeliveryAddress([...deliveryAddress, ...data?.data?.data]);

        setTotalPage(data?.data?.totalPages);
        setPage(page + 1);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const onPressItem = (item: DeliveryAddressDataProps) => {
    setSelectedAddress(item.id);
  };
  const onPressEdit = (item: DeliveryAddressDataProps) => {
    setFieldValue("firstName", item.first_name);
    setFieldValue("lastName", item.last_name);
    phoneRef.current?.selectCountry(item.iso);
    phoneRef.current?.setValue(item.phone_number);
    setFieldValue("phoneNumber", item.phone_number);
    setTamp_phone(item.phone_number);
    setFieldValue("deliveryAddress", item.address);
    // @ts-ignore
    setRegion({ key: item.region, title: item.region });
    setFieldValue("region", item.region);
    // @ts-ignore
    setCity({ key: item.city, title: item.city });
    setFieldValue("city", item.city);
    setMakeDefault(item.is_default);
    setTimeout(() => {
      sheetRef.current?.snapToIndex(1);
      setSelectedAddress(item.id);
      setEditOn(true);
    }, 1000);
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
  } = useFormik<DeliveryAddressFormProps>({
    validationSchema: DeliveryAddressScreenSchema(countryCode),
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      deliveryAddress: "",
      region: "",
      city: "",
    },
    onSubmit: async ({
      firstName,
      lastName,
      phoneNumber,
      deliveryAddress,
      region,
      city,
    }) => {
      try {
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("phone_number", phoneNumber);
        formData.append("iso", countryCode.toLowerCase());
        formData.append("address", deliveryAddress);
        formData.append("region", region);
        formData.append("city", city);
        formData.append("is_default", makeDefault);
        editOn && formData.append("address_id", selectedAddress);

        if (editOn) {
          const result = await dispatch(
            userUpdateDeliveryAddress({ formData: formData })
          );
          if (userUpdateDeliveryAddress.fulfilled.match(result)) {
            if (result.payload.status === 1) {
              console.log(
                "userUpdateDeliveryAddress result - - - ",
                result.payload
              );
              getSavedAddress(10, 1, true);
              handleClosePress();
            }
          } else {
            console.log(
              "userUpdateDeliveryAddress error - - - ",
              result.payload
            );
          }
        } else {
          const result = await dispatch(
            userDeliveryAddress({ formData: formData })
          );
          if (userDeliveryAddress.fulfilled.match(result)) {
            if (result.payload.status === 1) {
              console.log("userDeliveryAddress result - - - ", result.payload);
              getSavedAddress(10, 1, true);
              handleClosePress();
            }
          } else {
            console.log("userDeliveryAddress error - - - ", result.payload);
          }
        }
      } catch (error) {
        console.log("catch error - - - ", error);
      }
    },
  });

  const onPressNewAddress = () => {
    setMakeDefault(0);
    phoneRef.current?.selectCountry("rw");
    phoneRef.current?.setValue("250");
    // @ts-ignore
    regionRef?.current?.reset();
    // @ts-ignore
    cityRef?.current?.reset();
    // setRegion({ key: "", title: "" });
    // setCity({ key: "", title: "" });
    setFieldValue("firstName", "");
    setFieldValue("lastName", "");
    setFieldValue("phoneNumber", "");
    setFieldValue("deliveryAddress", "");
    setFieldValue("region", "");
    setFieldValue("city", "");

    setTimeout(() => {
      sheetRef.current?.snapToIndex(1);
    }, 500);
  };

  let phone_initial = tamp_phone === "" ? values.phoneNumber : tamp_phone;

  const onPressFlag = () => {
    setFieldValue("phoneNumber", "");
    setVisibleCountryPicker(true);
  };
  const onPhoneInputChange = (value: string, iso2: string) => {
    setCountryCode(iso2 as CountryCode);
    setFieldValue("phoneNumber", value);
  };

  const onPressCountryPicker = () => {
    setVisibleCountryPicker(true);
  };
  const onClosePickerModal = () => {
    setVisibleCountryPicker(false);
  };

  const onSelect = (
    country: string | TranslationLanguageCodeMap,
    cca2: CountryCode
  ) => {
    phoneRef?.current?.selectCountry(cca2.toLowerCase());
    setCountryCode(cca2);
    setCountry(country);
    setVisibleCountryPicker(false);
  };

  const onPressCurrentLocation = () => {
    requestLocationPermission();
  };

  Geocoder.init(GOOGLE_MAP_API_KEY, { language: "en" });

  const requestLocationPermission = async () => {
    setLoader(true);
    if (Platform.OS === "ios") {
      await Geolocation.requestAuthorization("whenInUse");
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
            buttonPositive: "ok",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          dispatch(
            setErrors({
              message: "Location permission Denied",
              status: 0,
              statusCode: null,
            })
          );
          setLoader(false);
        }
      } catch (err) {
        setLoader(false);
        console.log(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;
        getCurrentAddress(currentLatitude, currentLongitude);
      },
      (error) => {
        setLoader(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const getCurrentAddress = (lat: number, lng: number) => {
    Geocoder.from(lat, lng)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        // setAddress(addressComponent);
        setFieldValue("deliveryAddress", addressComponent);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  const handleCheckboxChange = () => {
    setMakeDefault(makeDefault == 1 ? 0 : 1);
  };

  const RenderAddressItems = () => {
    return (
      <View style={style.inputCont}>
        <CustomTxtInput
          ref={firstNameRef}
          placeholder="First name"
          returnKeyType="next"
          returnKeyLabel="next"
          keyboardType={"default"}
          maxLength={MAX_CHAR_LENGTH}
          onChangeText={handleChange("firstName")}
          onBlur={handleBlur("firstName")}
          value={values.firstName}
          error={errors.firstName}
          touched={touched.firstName}
          onSubmitEditing={() => lastnameRef.current?.focus()}
        />
        <CustomTxtInput
          ref={lastnameRef}
          placeholder="Last name"
          returnKeyType="next"
          returnKeyLabel="next"
          keyboardType={"default"}
          maxLength={MAX_CHAR_LENGTH}
          onChangeText={handleChange("lastName")}
          onBlur={handleBlur("lastName")}
          value={values.lastName}
          error={errors.lastName}
          touched={touched.lastName}
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
        <PhoneNumberInput
          ref={phoneRef}
          onPressFlag={onPressFlag}
          onChangePhoneNumber={(value, iso2) => onPhoneInputChange(value, iso2)}
          initialValue={phone_initial}
          textProps={{
            placeholder: "Phone Number",
            placeholderTextColor: theme.colors?.secondaryText,
            style: style.txtInStyle,
            returnKeyLabel: "next",
            returnKeyType: "next",
            maxLength: 18,
            onSubmitEditing: () => deliveryAddressRef.current?.focus(),
            onPressIn: () => {
              setTamp_phone("");
            },
          }}
          error={errors.phoneNumber}
        />

        <CountryPickerModal
          country={country}
          countryCode={countryCode}
          visible={visibleCountryPicker}
          onPressCountryPicker={onPressCountryPicker}
          onClosePickerModal={onClosePickerModal}
          onSelect={(country, cca2) => onSelect(country, cca2)}
        />
        <CustomTxtInput
          ref={deliveryAddressRef}
          placeholder="Delivery address"
          returnKeyType="done"
          returnKeyLabel="done"
          keyboardType={"default"}
          maxLength={MAX_CHAR_LENGTH}
          onChangeText={handleChange("deliveryAddress")}
          onBlur={handleBlur("deliveryAddress")}
          value={values.deliveryAddress}
          error={errors.deliveryAddress}
          touched={touched.deliveryAddress}
        />
        <TouchableOpacity
          style={style.locationCont}
          activeOpacity={0.8}
          onPress={onPressCurrentLocation}
        >
          {loader ? (
            <ActivityIndicator color={theme?.colors?.primary} />
          ) : (
            <LocationIcon
              color={theme?.colors?.primary}
              height={16}
              width={16}
            />
          )}
          <Text style={style.txtChooseLocation}>Auto-locate address</Text>
        </TouchableOpacity>
        <CustomDropdown
          ref={regionRef}
          dropDownData={CITIES}
          placeHolder={"Region"}
          value={region}
          topMargin={20}
          onSelect={(val) => {
            setRegionError("");
            setRegion(val.key);
            setFieldValue("region", val.key);
          }}
          error={regionError}
        />
        <CustomDropdown
          ref={cityRef}
          dropDownData={CITIES}
          placeHolder={"City"}
          value={city}
          topMargin={20}
          onSelect={(val) => {
            setCityError("");
            setCity(val.key);
            setFieldValue("city", val.key);
          }}
          error={cityError}
        />
        <View style={{ marginVertical: 10 }}>
          <CheckBoxSelection
            isChecked={makeDefault == 1}
            onPressCheckbox={handleCheckboxChange}
            itemName={"Make as default"}
            itemValue={"Make as default"}
            containerStyle={style.checkCont}
            textStyle={style.txtCheckCont}
            iconSize={22}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <CustomButton
            onPress={() => {
              if (region == "" && city == "") {
                setRegionError("Please select the region");
                setCityError("Please select the city");
              } else if (region == "") {
                setRegionError("Please select the region");
              } else if (city == "") {
                setCityError("Please select the city");
              } else {
                handleSubmit();
              }
            }}
            title={"Save"}
            buttonWidth="full"
            variant="primary"
            type="solid"
            loading={loading == LoadingState.CREATE}
            disabled={loading == LoadingState.CREATE}
          />
        </View>
      </View>
    );
  };

  const onPressSelectAddress = () => {
    if (selectedAddress) {
      console.log("selectedAddress", selectedAddress);
      dispatch(setSelectedDeliveryAddress(selectedAddress));
      navigation.navigate(Route.navModeOfDelivery);
    } else {
      dispatch(
        setErrors({
          message: "Please select the address",
          status: 0,
          statusCode: null,
        })
      );
    }
  };

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      getSavedAddress(10, page, true);
    }
  };

  return (
    <View style={style.container}>
      <StatusBar
        backgroundColor={theme.colors?.transparent}
        barStyle={"dark-content"}
      />
      <CustomHeader title="Select delivery address" />
      <View style={style.innerCont}>
        <DeliveryAddressList
          DeliveryAddressData={deliveryAddress}
          selectedAddress={selectedAddress}
          onPressItem={(item) => onPressItem(item)}
          onPressEdit={(item) => onPressEdit(item)}
          isLoading={isLoading}
          onEndReached={onEndReached}
        />
      </View>
      <View style={{ height: 15 }} />
      <CustomButton
        onPress={onPressSelectAddress}
        title={"Select address"}
        buttonWidth="full"
        variant="primary"
        type="solid"
      />
      <View style={{ height: 15 }} />
      <CustomButton
        onPress={onPressNewAddress}
        title={"Add new address"}
        buttonWidth="half"
        width={SCREEN_WIDTH - 40}
        variant="secondary"
        type="outline"
        icon={
          <SinglePlusIcon
            color={theme?.colors?.primary}
            style={{ marginRight: 10 }}
          />
        }
      />
      <AddressDataSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        title={"Add delivery address"}
        handleClosePress={handleClosePress}
        children={RenderAddressItems()}
      />
    </View>
  );
};

export default DeliveryAddress;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    paddingTop: props.insets.top,
    paddingBottom: props.insets.bottom + 15,
  },
  innerCont: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  headerBs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  txtHeaderTitle: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
  },
  inputCont: {
    flex: 1,
    marginHorizontal: 20,
  },
  txtInStyle: {
    flex: 1,
    height: Scale(50),
    color: theme.colors?.textPrimary,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs16,
    marginLeft: 5,
  },
  locationCont: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  txtChooseLocation: {
    fontSize: theme.fontSize?.fs11,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.primary,
    marginLeft: 10,
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
