import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { StatusBar } from "react-native";
import { makeStyles } from "react-native-elements";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// relative path
import { Route } from "../constant/navigationConstants";
import { AppRoutes } from "../types/navigation";
import AllCategories from "../screen/Categories/AllCategories";
import ModeOfDelivery from "../screen/ModeOfDelivery";
import Splash from "../screen/Splash";
import AddKyc from "../screen/authentication/Add kyc/AddKyc";
import ChooseAddress from "../screen/authentication/AddAddress/ChooseAddress";
import YourAddress from "../screen/authentication/AddAddress/YourAddress";
import ResetPassword from "../screen/authentication/ResetPassword";
import DeliveryAddress from "../screen/deliveryAddress/DeliveryAddress";
import Onboard from "../screen/onboard/Onboard";
import AddCard from "../screen/payment/AddCard";
import CardDetails from "../screen/payment/CardDetails";
import Payment from "../screen/payment/Payment";
import ProductDetails from "../screen/product/ProductDetails";
import ChangePassword from "../screen/profile/ChangePassword";
import EditProfile from "../screen/profile/EditProfile";
import SearchProducts from "../screen/search/SearchProducts";
import AddNewProduct from "../screen/sell/AddNewProduct";
import Congratulations from "../screen/sell/Congratulations";
import Authentication from "./Authentication";
import Bottombar from "./Bottombar/Bottombar";
import TakeSelfie from "../screen/authentication/TakeSelfie";
import Chatroom from "../screen/chat/Chatroom";
import MyStorefront from "../screen/Storefront/MyStorefront";
import TransactionHistory from "../screen/profile/TransactionHistory";
import Messaging from "../screen/chat/Messaging";
import Congratulations1 from "../screen/sell/Congratulations1";
import InternetConnectivityLabel from "../components/ui/InternetConnectivityLabel";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator<AppRoutes>();

const MainStack = () => {
  const styles = useStyles();

  const [isConnected, setIsConnected] = React.useState<boolean | null>(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <InternetConnectivityLabel isConnected={isConnected} />
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "ios",
            animationDuration: 1000,
          }}
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
          <Stack.Screen name={Route.navAddCard} component={AddCard} />
          <Stack.Screen name={Route.navCardDetails} component={CardDetails} />
          <Stack.Screen name={Route.navPayment} component={Payment} />
          <Stack.Screen
            name={Route.navProductDetails}
            component={ProductDetails}
          />
          <Stack.Screen
            name={Route.navCongratulations}
            component={Congratulations}
          />
          <Stack.Screen
            name={Route.navCongratulations1}
            component={Congratulations1}
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
          <Stack.Screen name={Route.navTakeSelfie} component={TakeSelfie} />
          <Stack.Screen name={Route.navEditProfile} component={EditProfile} />
          <Stack.Screen
            name={Route.navChangePassword}
            component={ChangePassword}
          />
          <Stack.Screen
            name={Route.navResetPassword}
            component={ResetPassword}
          />
          <Stack.Screen name={Route.navChatroom} component={Chatroom} />
          <Stack.Screen name={Route.navMyStorefront} component={MyStorefront} />
          <Stack.Screen
            name={Route.navTransactionHistory}
            component={TransactionHistory}
          />
          <Stack.Screen name={Route.navMessaging} component={Messaging} />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default MainStack;

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    zIndex: 11,
  },
}));
