import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {makeStyles, useTheme} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Scale from '../utils/Scale';

interface SplashScreenProps {}

const Splash: React.FC<SplashScreenProps> = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const {theme} = useTheme();

  useEffect(() => {
    const init = async () => {
      await RNBootSplash.hide();
      // const token = await getData(secureStoreKeys.JWT_TOKEN);
      // console.log('Login Token -- ', token);
      // const u_role = await getData(USER_ROLE);
      // if (token) {
      //   const user_data = await getData(USER_DATA);
      //   dispatch(setUserData(user_data));
      //   if (u_role === User_Role_Buyer_Seller) {
      //     setTimeout(() => {
      //       navigation.dispatch(
      //         CommonActions.reset({
      //           index: 0,
      //           routes: [
      //             {
      //               name: Route.navBuyerSellerStack,
      //               state: {
      //                 routes: [{name: Route.navDashboard}],
      //               },
      //             },
      //           ],
      //         }),
      //       );
      //     }, 2000);
      //   } else if (u_role === User_Role_Mover) {
      //     setUpNavigation();
      //   }
      // } else {
      //   if (await appAlreadyOpen()) {
      //     if (u_role == undefined) {
      //       navigation.dispatch(
      //         CommonActions.reset({
      //           index: 0,
      //           routes: [{name: Route.navSelectRoll}],
      //         }),
      //       );
      //     } else {
      //       if (u_role === User_Role_Buyer_Seller) {
      //         setTimeout(() => {
      //           navigation.dispatch(
      //             CommonActions.reset({
      //               index: 0,
      //               routes: [{name: Route.navAuthentication}],
      //             }),
      //           );
      //         }, 2000);
      //       } else if (u_role === User_Role_Mover) {
      //         setUpNavigation();
      //       }
      //     }
      //   } else {
      //     setTimeout(async () => {
      //       navigation.dispatch(
      //         CommonActions.reset({
      //           index: 0,
      //           routes: [{name: Route.navOnboard}],
      //         }),
      //       );
      //     }, 2000);
      //   }
      // }
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
        barStyle={'light-content'}
      />
      <FastImage
        source={require('../assets/images/splash_logo.png')}
        style={{
          height: 224.74,
          width: Scale(195),
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme?.colors?.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
}));
