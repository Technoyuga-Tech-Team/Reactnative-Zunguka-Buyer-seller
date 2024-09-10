import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { GOOGLE_WEB_CLIENT_ID, USER_DATA, secureStoreKeys } from "../constant";
import { Route } from "../constant/navigationConstants";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { saveAddress, setUserData } from "../store/settings/settings.slice";
import Scale from "../utils/Scale";
import { appAlreadyOpen, getData } from "../utils/asyncStorage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Images } from "../assets/images";

interface SplashScreenProps {}

const Splash: React.FC<SplashScreenProps> = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      // scopes: ['https://www.googleapis.com/auth/user.phonenumbers.read'],
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = await getData(secureStoreKeys.JWT_TOKEN);
      console.log("Login Token -- ", token);
      if (token) {
        const user_data = await getData(USER_DATA);
        console.log("user_data - - - -  - -", user_data);
        if (user_data?.is_social == 1) {
          await GoogleSignin.signOut();
        }
        dispatch(setUserData(user_data));

        let is_username = user_data.is_username_added;
        let steps = user_data.step;
        let isStepCompleted = user_data.is_profile_completed;
        let isVerify_by_Admin = user_data.is_kyc_verified_by_admin;
        console.log("isStepCompleted", isStepCompleted);
        console.log("isVerify_by_Admin", isVerify_by_Admin);
        console.log("steps", steps);
        if (is_username == 0) {
          // @ts-ignore
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: Route.navAuthentication,
                  state: {
                    routes: [{ name: Route.navAddUserName }],
                  },
                },
              ],
            })
          );
        } else {
          if (isStepCompleted == 1 && isVerify_by_Admin == 1) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: Route.navDashboard }],
              })
            );
          } else {
            if (steps == 0) {
              dispatch(saveAddress(""));
              // @ts-ignore
              // navigation.navigate(Route.navYourAddress, { fromOTP: true });
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: Route.navYourAddress, params: { fromOTP: true } },
                  ],
                })
              );
            } else if (steps == 1) {
              // @ts-ignore
              // navigation.navigate(Route.navAddKyc, { fromOTP: true });
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: Route.navAddKyc, params: { fromOTP: true } },
                  ],
                })
              );
            } else if (steps == 2 || steps == 3) {
              // @ts-ignore
              // navigation.navigate(Route.navTakeSelfie, { fromflow: false });
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: Route.navTakeSelfie, params: { fromflow: false } },
                  ],
                })
              );
            }
          }
        }
      } else {
        if (await appAlreadyOpen()) {
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: Route.navAuthentication }],
              })
            );
          }, 2000);
        } else {
          setTimeout(async () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: Route.navOnboard }],
              })
            );
          }, 2000);
        }
      }
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme?.colors?.primary}
        barStyle={"dark-content"}
      />
      <FastImage
        source={Images.SPLASH_IMAGE}
        style={{
          height: 224.74,
          width: Scale(170),
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme?.colors?.primary,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
}));
