import React from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../components/ui/CustomHeader";
import { Route } from "../constant/navigationConstants";
import { ThemeProps } from "../types/global.types";
import { HomeNavigationProps } from "../types/navigation";
import { CustomTxtInput } from "../components/ui/CustomTextInput";
import { MAX_CHAR_LENGTH } from "../constant";
import Scale from "../utils/Scale";
import CustomButton from "../components/ui/CustomButton";

const ContactUs: React.FC<HomeNavigationProps<Route.navContactUs>> = ({}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      <CustomHeader title="Contact Us" />
      <View style={style.txtInCont}>
        <CustomTxtInput
          // ref={emaiRef}
          placeholder="Email Address"
          returnKeyType="next"
          returnKeyLabel="next"
          keyboardType={"email-address"}
          // onChangeText={handleChange("email")}
          // onBlur={handleBlur("email")}
          // value={values.email}
          // error={errors.email}
          // touched={touched.email}
          // onSubmitEditing={() => phoneRef.current?.focus()}
        />
        <CustomTxtInput
          // ref={firstNameRef}
          placeholder="Subject"
          returnKeyType="next"
          returnKeyLabel="next"
          keyboardType={"default"}
          maxLength={MAX_CHAR_LENGTH}
          // onChangeText={handleChange("firstName")}
          // onBlur={handleBlur("firstName")}
          // value={values.firstName}
          // error={errors.firstName}
          // touched={touched.firstName}
          // onSubmitEditing={() => lastnameRef.current?.focus()}
        />

        <CustomTxtInput
          placeholder={`Message`}
          returnKeyType="next"
          returnKeyLabel="next"
          keyboardType={"default"}
          textInputStyle={style.txtDesc}
          style={style.textInput}
          multiline={true}
          textAlignVertical="top"
          maxLength={200}
          //   onChangeText={onChangeProductDescription}
          //   onBlur={onBlurDescription}
          //   value={productDescription}
          //   error={productDescriptionError}
          //   touched={productDescriptionError !== ""}
          onSubmitEditing={() => {}}
          // extraPeddingLeft={true}
        />
      </View>
      <CustomButton
        onPress={() => {}}
        title={"Submit"}
        buttonWidth="full"
        variant="primary"
        type="solid"
        // disabled={!isValid || loading === LoadingState.CREATE}
        // loading={loading === LoadingState.CREATE}
      />
    </View>
  );
};

export default ContactUs;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
    paddingBottom: props.insets.bottom + 10,
  },
  txtDesc: {
    height: Scale(150),
    // backgroundColor: theme?.colors?.textInputFieldBg,
    paddingHorizontal: 10,
    paddingTop: 3,
    borderRadius: 8,
    // marginHorizontal: 20,
    borderWidth: 1,
    borderColor: theme?.colors?.secondaryText,
  },
  textInput: {
    height: 140,
    width: "100%",
    color: theme.colors?.textPrimary,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs15,
    lineHeight: 20,
  },
  txtInCont: {
    marginTop: 10,
    marginHorizontal: 20,
    flex: 1,
  },
}));
