import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type TopRoutes = {
  OpenItems: undefined;
  ClosedItems: undefined;
  ProductDetails: { itemId: number };
};

export type AppRoutes = {
  Onboard: undefined;
  Splash: undefined;
  Authentication: undefined;
  YourAddress: undefined;
  ChooseAddress: undefined;
  AddKyc: undefined;
  TakeSelfie: undefined;
  Dashboard: undefined;
  Home: undefined;
  SearchProduct: undefined;
  AddNewProduct: undefined;
  Congratulations: undefined;
  Congratulations1: undefined;
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
  DeliveryAddress: undefined;
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
  Payment: undefined;
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
  AddUserName: undefined;
  YourAddress: { fromOTP?: boolean };
  AddKyc: { fromOTP?: boolean };
  ChooseAddress: undefined;
  EnterOTP: { phone?: string; type: string };
  ChangePassword: undefined;
  Mainstack: undefined;
  Dashboard: undefined;
  Authentication: undefined;
  ResetPassword: { phone?: string; email?: string };
  ChangePassword: undefined;
  TakeSelfie: { fromflow?: boolean };
};

export type BottomRoutes = {
  Home: undefined;
  Favourites: undefined;
  Sell: undefined;
  Alert: undefined;
  Profile: undefined;
};

export type HomeRoutes = {
  Home: undefined;
  SearchProduct: { mainCat: string; subCat: string };
  Favourites: undefined;
  Sell: undefined;
  Alert: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  ProductDetails: { itemId: number };
  AddNewProduct: undefined;
  AllCategories: undefined;
  Congratulations: { itemId: number };
  Congratulations1: undefined;
  DeliveryAddress: undefined;
  ModeOfDelivery: undefined;
  AddCard: undefined;
  CardDetails: { from: string };
  Payment: undefined;
  Storefront: undefined;
  TransactionHistory: undefined;
  Chatroom: { receiver_id: string; product_id: string };
  Messaging: undefined;
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

export interface MyFrontStoreNavigationProps<
  RouteName extends keyof TopRoutes
> {
  navigation: NativeStackNavigationProp<TopRoutes, RouteName>;
  route: RouteProp<TopRoutes, RouteName>;
}
