import { CommonActions } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { Keyboard, TextInput, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ui/CustomButton";
import CustomHeader from "../../components/ui/CustomHeader";
import { CustomTxtInput } from "../../components/ui/CustomTextInput";
import { MAX_CHAR_LENGTH } from "../../constant";
import { UsernameScreenSchema } from "../../constant/formValidations";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectAuthenticationLoading } from "../../store/authentication/authentication.selectors";
import { userAddUserName } from "../../store/authentication/authentication.thunks";
import { saveAddress } from "../../store/settings/settings.slice";
import { UsernameFormProps } from "../../types/authentication.types";
import { LoadingState, ThemeProps } from "../../types/global.types";
import { AuthNavigationProps } from "../../types/navigation";

const AddUserName: React.FC<AuthNavigationProps<Route.navAddUserName>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const usernameRef = React.useRef<TextInput>(null);
  const loading = useSelector(selectAuthenticationLoading);

  const dispatch = useAppDispatch();

  const {
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    isValid,
    handleSubmit,
    setFieldValue,
  } = useFormik<UsernameFormProps>({
    validationSchema: UsernameScreenSchema(),
    initialValues: {
      username: "",
    },
    onSubmit: async ({ username }) => {
      const result = await dispatch(
        userAddUserName({
          username: username.trim(),
        })
      );
      if (userAddUserName.fulfilled.match(result)) {
        console.log("result.payload", result.payload);
        if (result.payload?.status == 1) {
          let steps = result.payload?.user?.step;
          console.log("steps", steps);
          if (steps !== 2) {
            if (steps == 0) {
              dispatch(saveAddress(""));
              navigation.navigate(Route.navYourAddress, { fromOTP: true });
            } else if (steps == 1) {
              navigation.navigate(Route.navAddKyc, { fromOTP: true });
            }
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: Route.navDashboard }],
              })
            );
          }
        }
      }
    },
  });

  const onPressBackBtn = () => {
    if (navigation.canGoBack()) {
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

  return (
    <View style={style.container}>
      <CustomHeader
        title="Add Username"
        onPressBackBtn={onPressBackBtn}
        isOutsideBack={true}
      />
      <View style={style.innerContainer}>
        <CustomTxtInput
          ref={usernameRef}
          placeholder="Username"
          returnKeyType="done"
          returnKeyLabel="done"
          keyboardType={"default"}
          maxLength={MAX_CHAR_LENGTH}
          onChangeText={handleChange("username")}
          onBlur={handleBlur("username")}
          value={values.username}
          error={errors.username}
          touched={touched.username}
        />
      </View>
      <View style={style.btnCont}>
        <CustomButton
          onPress={() => {
            Keyboard.dismiss();
            handleSubmit();
          }}
          title={"Continue"}
          buttonWidth="full"
          variant="primary"
          type="solid"
          disabled={!isValid || loading === LoadingState.CREATE}
          loading={loading === LoadingState.CREATE}
        />
      </View>
    </View>
  );
};

export default AddUserName;
const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    paddingTop: props.insets.top,
    paddingBottom: props.insets.bottom + 10,
    backgroundColor: theme.colors?.background,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btnCont: {
    marginTop: 40,
  },
}));
