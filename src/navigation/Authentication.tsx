import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RNBootSplash from "react-native-bootsplash";
import { AuthenticationRoutes } from "../types/navigation";
import { Route } from "../constant/navigationConstants";
import Login from "../screen/authentication/Login";
import Signup from "../screen/authentication/Signup";
import ForgotPassword from "../screen/authentication/ForgotPassword/ForgotPassword";
import EnterOTP from "../screen/authentication/ForgotPassword/EnterOTP";

// relative path

const Stack = createNativeStackNavigator<AuthenticationRoutes>();

const Authentication = () => {
  React.useEffect(() => {
    const init = async () => {
      await RNBootSplash.hide();
    };
    init();
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.navLogin} component={Login} />
      <Stack.Screen name={Route.navSignup} component={Signup} />
      <Stack.Screen name={Route.navForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={Route.navEnterOTP} component={EnterOTP} />
    </Stack.Navigator>
  );
};

export default Authentication;
