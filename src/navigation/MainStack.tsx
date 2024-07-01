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
import Authentication from "./Authentication";
import YourAddress from "../screen/authentication/AddAddress/YourAddress";
import ChooseAddress from "../screen/authentication/AddAddress/ChooseAddress";
import AddKyc from "../screen/authentication/Add kyc/AddKyc";
import Bottombar from "./Bottombar/Bottombar";

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
        <Stack.Screen
          name={Route.navAuthentication}
          component={Authentication}
        />
        <Stack.Screen name={Route.navDashboard} component={Bottombar} />
        <Stack.Screen name={Route.navYourAddress} component={YourAddress} />
        <Stack.Screen name={Route.navChooseAddress} component={ChooseAddress} />
        <Stack.Screen name={Route.navAddKyc} component={AddKyc} />
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
