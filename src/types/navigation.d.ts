import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type AppRoutes = {
  Onboard: undefined;
  Splash: undefined;
  Authentication: undefined;
  YourAddress: undefined;
  ChooseAddress: undefined;
  AddKyc: undefined;
  Dashboard: undefined;
  Home: undefined;
  Search: undefined;
  Add: undefined;
  SellAnItem: undefined;
  ListAnother: undefined;
  Storefront: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  SavedItems: undefined;
  PurchasedHistory: undefined;
  ResetPassword: undefined;
  Messaging: undefined;
  Chatroom: undefined;
  ProductDetails: undefined;
  TransactionHistory: undefined;
  TransactionDetails: undefined;
  NotificationSetting: undefined;
  ProductFilter: undefined;
  Notification: undefined;
  AllDeals: undefined;
  AllCategories: undefined;
  ModeOfDelivery: undefined;
  ModeOfPayment: undefined;
  CardDetails: undefined;
  AddCard: undefined;
  DeliveryDetails: undefined;
  DeliveryCompleteAndRateDriver: undefined;
  SelectMover: undefined;
  PackageInfo: undefined;
  ConfirmPackageInfo: undefined;
  DeliveryDetails1: undefined;
  MoverHistory: undefined;
  ConfirmSelfPickup: undefined;
  CategoryProduct: undefined;
  RequestToMover: undefined;
  PaymentToMover: undefined;
  VisitProfile: undefined;
  JobHistory: undefined;
};

export type AuthenticationRoutes = {
  Onboard: undefined;
  SelectRoll: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  YourAddress: undefined;
  AddKyc: undefined;
  ChooseAddress: undefined;
  EnterOTP: { phone?: string; type: string };
  ChangePassword: undefined;
  Mainstack: undefined;
  Dashboard: undefined;
  Authentication: undefined;
  ResetPassword: { phone?: string; email?: string };
  ChangePassword: undefined;
};

export type BottomRoutes = {
  Home: undefined;
  Favourites: undefined;
  Sell: undefined;
  Inbox: undefined;
  Profile: undefined;
};

export type HomeRoutes = {
  Home: undefined;
  Favourites: undefined;
  Sell: undefined;
  Inbox: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};

export interface MainNavigationProps<RouteName extends keyof AppRoutes> {
  navigation: NativeStackNavigationProp<AppRoutes, "Splash">;
  route: RouteProp<AppRoutes, RouteName>;
}

export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: NativeStackNavigationProp<AuthenticationRoutes, RouteName>;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: NativeStackNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}
