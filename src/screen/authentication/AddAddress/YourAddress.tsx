import { View, Text } from "react-native";
import React, { useState } from "react";
import { AuthNavigationProps } from "../../../types/navigation";
import { Route } from "../../../constant/navigationConstants";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../../components/ui/CustomHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadPhotos from "../../../components/UploadPhotos";
import { imagePickerProps } from "../../../types/common.types";
import CustomButton from "../../../components/ui/CustomButton";
import { CustomTxtInput } from "../../../components/ui/CustomTextInput";
import LocationIcon from "../../../components/ui/svg/LocationIcon";

const YourAddress: React.FC<AuthNavigationProps<Route.navYourAddress>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [houseImage, setHouseImages] = useState<imagePickerProps[]>([]);
  const [productImageError, setProductImageError] = useState<string>("");

  const onPressGPSAddress = () => {
    navigation.navigate(Route.navChooseAddress);
  };

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
        <View style={style.inputCont}>
          <CustomTxtInput
            textInputTitle="GPS Address"
            placeholder="GPS Address"
            // onChangeText={handleChange("password")}
            // onBlur={handleBlur("password")}
            // value={values.password}
            // error={errors.password}
            // touched={touched.password}
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
        onPress={() => {}}
        title={"Continue"}
        buttonWidth="full"
        variant="primary"
        type="solid"
        // disabled={!isValid || loading === LoadingState.CREATE}
        // loading={loading === LoadingState.CREATE}
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
}));
