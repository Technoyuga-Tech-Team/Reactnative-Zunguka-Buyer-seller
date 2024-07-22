import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddressDataSheet from "../../components/DeliveryAddress/AddressDataSheet";
import DeliveryAddressList from "../../components/DeliveryAddress/DeliveryAddressList";
import CustomButton from "../../components/ui/CustomButton";
import CustomHeader from "../../components/ui/CustomHeader";
import SinglePlusIcon from "../../components/ui/svg/SinglePlusIcon";
import {
  AddressData,
  CITIES,
  MAX_CHAR_LENGTH,
  SCREEN_WIDTH,
} from "../../constant";
import { Route } from "../../constant/navigationConstants";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { useFormik } from "formik";
import { SignupFormProps } from "../../types/authentication.types";
import {
  DeliveryAddressScreenSchema,
  SignupScreenSchema,
} from "../../constant/formValidations";
import { DeliveryAddressFormProps } from "../../types/deliveryaddress.types";
import {
  CountryCode,
  TranslationLanguageCodeMap,
} from "react-native-country-picker-modal";
import { CustomTxtInput } from "../../components/ui/CustomTextInput";
import ReactNativePhoneInput from "react-native-phone-input";
import { PhoneNumberInput } from "../../components/ui/PhoneNumberInput";
import CountryPickerModal from "../../components/ui/CountryPickerModal";
import Scale from "../../utils/Scale";
import LocationIcon from "../../components/ui/svg/LocationIcon";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";

const DeliveryAddress: React.FC<
  HomeNavigationProps<Route.navDeliveryAddress>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const sheetRef = useRef<BottomSheet>(null);
  const firstNameRef = React.useRef<TextInput>(null);
  const lastnameRef = React.useRef<TextInput>(null);
  const phoneRef = React.useRef<ReactNativePhoneInput>(null);
  const deliveryAddressRef = React.useRef<TextInput>(null);

  const [selectedAddress, setSelectedAddress] = useState();
  const [visibleCountryPicker, setVisibleCountryPicker] =
    useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<CountryCode>("RW");
  const [country, setCountry] = useState<string | TranslationLanguageCodeMap>(
    ""
  );
  const [visibleAddress, setVisibleAddress] = useState<boolean>(false);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const onPressItem = (item: any) => {
    setSelectedAddress(item);
  };
  const onPressEdit = (item: any) => {
    setSelectedAddress(item);
    setTimeout(() => {
      sheetRef.current?.snapToIndex(1);
    }, 1000);
  };

  const onPressNewAddress = () => {
    sheetRef.current?.snapToIndex(1);
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
    }) => {},
  });

  useEffect(() => {
    if (selectedAddress) {
      setFieldValue("firstName", selectedAddress.firstName);
      setFieldValue("lastName", selectedAddress.lastName);
      setFieldValue("phoneNumber", selectedAddress.phone);
      setFieldValue("deliveryAddress", selectedAddress.address);
      setFieldValue("region", selectedAddress.region);
      setFieldValue("city", selectedAddress.city);
    }
  }, [selectedAddress]);

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
    setVisibleAddress(true);
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
          initialValue={values.phoneNumber}
          textProps={{
            placeholder: "Phone Number",
            placeholderTextColor: theme.colors?.secondaryText,
            style: style.txtInStyle,
            returnKeyLabel: "next",
            returnKeyType: "next",
            maxLength: 18,
            onSubmitEditing: () => deliveryAddressRef.current?.focus(),
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
          <LocationIcon color={theme?.colors?.primary} height={16} width={16} />
          <Text style={style.txtChooseLocation}>Auto-locate address</Text>
        </TouchableOpacity>
        <CustomDropdown
          dropDownData={CITIES}
          placeHolder={"Region"}
          value={region}
          topMargin={20}
          onSelect={(val) => {
            setRegionError("");
            setRegion(val.key);
          }}
          error={regionError}
        />
        <CustomDropdown
          dropDownData={CITIES}
          placeHolder={"City"}
          value={city}
          topMargin={20}
          onSelect={(val) => {
            setCityError("");
            setCity(val.key);
          }}
          error={cityError}
        />
        <View style={{ marginVertical: 10 }}>
          <CustomButton
            onPress={() => handleSubmit()}
            title={"Save"}
            buttonWidth="full"
            variant="primary"
            type="solid"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Select delivery address" />
      <View style={style.innerCont}>
        <DeliveryAddressList
          DeliveryAddressData={AddressData}
          selectedAddress={selectedAddress}
          onPressItem={(item) => onPressItem(item)}
          onPressEdit={(item) => onPressEdit(item)}
        />
      </View>
      <CustomButton
        onPress={() => {}}
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
}));