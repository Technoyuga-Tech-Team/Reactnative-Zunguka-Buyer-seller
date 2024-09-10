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
import ArchivedProductDetails from "../screen/product/ArchivedProductDetails";
import Earnings from "../screen/Earnings";
import Withdraw from "../screen/Withdraw";
import Notification from "../screen/Notification/Notification";
import MySavedKeywords from "../screen/MySavedKeywords";
import RequestToMover from "../screen/delivery/RequestToMover";
import PaymentToMover from "../screen/delivery/PaymentToMover";
import PayMover from "../screen/delivery/PayMover";
import DeliveryDetails1 from "../screen/delivery/DeliveryDetails1";
import DeliveryCompleteAndRateDriver from "../screen/delivery/DeliveryCompleteAndRateDriver";
import PurchasedHistory from "../screen/profile/PurchasedHistory";
import JobHistory from "../screen/JobHistory";
import PayoutHistory from "../screen/profile/PayoutHistory";

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
          <Stack.Screen name={Route.navDashboard} component={Bottombar} />
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
            name={Route.navArchivedProductDetails}
            component={ArchivedProductDetails}
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
          <Stack.Screen name={Route.navEarnings} component={Earnings} />
          <Stack.Screen name={Route.navWithdraw} component={Withdraw} />
          <Stack.Screen name={Route.navNotification} component={Notification} />
          <Stack.Screen
            name={Route.navMySavedKeyword}
            component={MySavedKeywords}
          />
          <Stack.Screen
            name={Route.navRequestToMover}
            component={RequestToMover}
          />
          <Stack.Screen
            name={Route.navPaymentToMover}
            component={PaymentToMover}
          />
          <Stack.Screen name={Route.navPayMover} component={PayMover} />
          <Stack.Screen
            name={Route.navDeliveryDetails1}
            component={DeliveryDetails1}
          />
          <Stack.Screen
            name={Route.navDeliveryCompleteAndRateDriver}
            component={DeliveryCompleteAndRateDriver}
          />
          <Stack.Screen
            name={Route.navPurchasedHistory}
            component={PurchasedHistory}
          />
          <Stack.Screen name={Route.navJobHistory} component={JobHistory} />
          <Stack.Screen
            name={Route.navPayoutHistory}
            component={PayoutHistory}
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
    zIndex: 11,
  },
}));
