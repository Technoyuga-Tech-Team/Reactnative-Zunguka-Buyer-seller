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

        let steps = user_data.step;
        console.log("steps", steps);
        if (steps !== 2) {
          if (steps == 0) {
            dispatch(saveAddress(""));
            // @ts-ignore
            navigation.navigate(Route.navYourAddress, { fromOTP: true }); // here i have take fromOTP only for navigate to the login screen back from your address
          } else if (steps == 1) {
            // @ts-ignore
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

  //   const setUpNavigation = async () => {
  //     const {data: currentUser} = await fetch({
  //       url: API.ME,
  //       method: 'GET',
  //     });

  //     if (currentUser && currentUser?.status === 1) {
  //       // setNavigation(currentUser.user, navigation);
  //     } else {
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 0,
  //           routes: [
  //             {
  //               name: Route.navAuthentication,
  //               state: {
  //                 routes: [{name: Route.navLogin}],
  //               },
  //             },
  //           ],
  //         }),
  //       );
  //     }
  //   };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme?.colors?.primary}
        barStyle={"dark-content"}
      />
      <FastImage
        source={require("../assets/images/splash_black_logo.png")}
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
