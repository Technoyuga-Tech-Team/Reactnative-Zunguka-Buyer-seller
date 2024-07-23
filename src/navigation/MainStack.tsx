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
import EditProfile from "../screen/profile/EditProfile";
import ChangePassword from "../screen/profile/ChangePassword";
import ResetPassword from "../screen/authentication/ResetPassword";
import SearchProducts from "../screen/search/SearchProducts";
import ProductDetails from "../screen/product/ProductDetails";
import AddNewProduct from "../screen/sell/AddNewProduct";
import AllCategories from "../screen/Categories/AllCategories";
import Congratulations from "../screen/sell/Congratulations";
import DeliveryAddress from "../screen/deliveryAddress/DeliveryAddress";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import DeliveryMode from "../components/DeliveryMode";
import ModeOfDelivery from "../screen/ModeOfDelivery";

const Stack = createNativeStackNavigator<AppRoutes>();

const MainStack = () => {
  const styles = useStyles();

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={Route.navSplash}
        >
          <Stack.Screen
            name={Route.navSplash}
            component={Splash}
            options={{
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
          />
          <Stack.Screen name={Route.navOnboard} component={Onboard} />
          <Stack.Screen
            name={Route.navAuthentication}
            component={Authentication}
          />
          <Stack.Screen
            name={Route.navDashboard}
            component={Bottombar}
            options={{
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
          />
          <Stack.Screen
            name={Route.navAddNewProduct}
            component={AddNewProduct}
          />
          <Stack.Screen
            name={Route.navSearchProduct}
            component={SearchProducts}
          />
          <Stack.Screen
            name={Route.navModeOfDelivery}
            component={ModeOfDelivery}
          />
          <Stack.Screen
            name={Route.navProductDetails}
            component={ProductDetails}
          />
          <Stack.Screen
            name={Route.navCongratulations}
            component={Congratulations}
          />
          <Stack.Screen
            name={Route.navDeliveryAddress}
            component={DeliveryAddress}
          />
          <Stack.Screen
            name={Route.navAllCategories}
            component={AllCategories}
          />
          <Stack.Screen name={Route.navYourAddress} component={YourAddress} />
          <Stack.Screen
            name={Route.navChooseAddress}
            component={ChooseAddress}
          />
          <Stack.Screen name={Route.navAddKyc} component={AddKyc} />
          <Stack.Screen name={Route.navEditProfile} component={EditProfile} />
          <Stack.Screen
            name={Route.navChangePassword}
            component={ChangePassword}
          />
          <Stack.Screen
            name={Route.navResetPassword}
            component={ResetPassword}
          />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default MainStack;

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
  },
}));
