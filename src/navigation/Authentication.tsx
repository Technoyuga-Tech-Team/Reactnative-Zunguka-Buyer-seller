import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import RNBootSplash from "react-native-bootsplash";
import { Route } from "../constant/navigationConstants";
import AddUserName from "../screen/authentication/AddUserName";
import EnterOTP from "../screen/authentication/ForgotPassword/EnterOTP";
import ForgotPassword from "../screen/authentication/ForgotPassword/ForgotPassword";
import Login from "../screen/authentication/Login";
import Signup from "../screen/authentication/Signup";
import { AuthenticationRoutes } from "../types/navigation";

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
      <Stack.Screen name={Route.navAddUserName} component={AddUserName} />
    </Stack.Navigator>
  );
};

export default Authentication;
