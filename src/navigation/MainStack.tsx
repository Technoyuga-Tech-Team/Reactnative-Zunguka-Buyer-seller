import * as React from "react";
import { makeStyles } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
// relative path
import { Route } from "../constant/navigationConstants";
import Splash from "../screen/Splash";
import Onboard from "../screen/onboard/Onboard";
import { AppRoutes } from "../types/navigation";

const Stack = createNativeStackNavigator<AppRoutes>();

const MainStack = () => {
  const styles = useStyles();

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Route.navSplash}
      >
        <Stack.Screen name={Route.navSplash} component={Splash} />
        <Stack.Screen name={Route.navOnboard} component={Onboard} />
        {/* 
        <Stack.Screen name={Route.navOnboard1} component={Onboard1} />
        <Stack.Screen name={Route.navSelectRoll} component={SelectUserRoll} />
        <Stack.Screen
          name={Route.navAuthentication}
          component={Authentication}
        />
        <Stack.Screen
          name={Route.navBuyerSellerStack}
          component={BuyerSellerStack}
        />
        <Stack.Screen name={Route.navMoverStack} component={MoverStack} />
        <Stack.Screen name={Route.navMessaging} component={Messaging} />
        <Stack.Screen name={Route.navChatroom} component={Chatroom} />
        <Stack.Screen
          name={Route.navChangePassword}
          component={ChangePassword}
        />
        <Stack.Screen name={Route.navEditProfile} component={EditProfile} />
        <Stack.Screen
          name={Route.navPaymentToMover}
          component={PaymentToMover}
        />
        <Stack.Screen
          name={Route.navDeliveryDetails1}
          component={DeliveryDetails1}
        />
        <Stack.Screen name={Route.navVisitProfile} component={VisitProfile} />
        <Stack.Screen name={Route.navJobHistory} component={JobHistory} /> */}
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default MainStack;

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
  },
}));
