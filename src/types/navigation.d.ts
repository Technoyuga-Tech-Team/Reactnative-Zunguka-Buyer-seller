import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ProductDataProps } from "./product.types";

export type TopRoutes = {
  OpenItems: undefined;
  ClosedItems: undefined;
  ProductDetails: { itemId: number };
  ArchivedProductDetails: { item: ProductDataProps };
  RequestToMover: undefined;
};

export type MoverRequestTopRoutes = {
  OngoingMoverRequest: undefined;
  PastMoverRequest: undefined;
};

export type AppRoutes = {
  Onboard: undefined;
  Splash: undefined;
  Authentication: undefined;
  ChooseAddress: undefined;
  AddKyc: { fromOTP?: boolean };
  TakeSelfie: { fromflow?: boolean };
  Dashboard: undefined;
  Home: undefined;
  SearchProduct: { mainCat: string; subCat: string };
  AddNewProduct: { product_id?: string | null };
  Congratulations: { itemId: number };
  Congratulations1: { modeOfDelivery: string };
  SellAnItem: undefined;
  ListAnother: undefined;
  Storefront: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  SavedItems: undefined;
  PurchasedHistory: undefined;
  ResetPassword: { phone?: string; email?: string };
  Messaging: undefined;
  Chatroom: { receiver_id: string; product_id: string };
  ProductDetails: { itemId: number };
  ProductDetails1: { itemId: number };
  ArchivedProductDetails: { item: ProductDataProps };
  DeliveryAddress: undefined;
  TransactionHistory: undefined;
  TransactionDetails: undefined;
  NotificationSetting: undefined;
  ProductFilter: undefined;
  Notification: undefined;
  AllDeals: undefined;
  AllBrand: undefined;
  AllCategories: undefined;
  ModeOfDelivery: undefined;
  ModeOfPayment: undefined;
  CardDetails: { from: string };
  AddCard: undefined;
  Payment: { modeOfDelivery?: string; deliveryPrice?: number };
  DeliveryDetails: undefined;
  DeliveryCompleteAndRateDriver: {
    user_id: string;
    package_details_id: string;
  };
  SelectMover: undefined;
  PackageInfo: undefined;
  ConfirmPackageInfo: undefined;
  DeliveryDetails1: { package_details_id: string; from?: string };
  MoverHistory: undefined;
  ConfirmSelfPickup: undefined;
  CategoryProduct: undefined;
  RequestToMover: undefined;
  PaymentToMover: {
    pickup_Address: string;
    delivery_Address: string;
    price: string;
    item_name: string;
    package_details_id: string;
  };
  VisitProfile: undefined;
  JobHistory: undefined;
  YourAddress: { fromOTP?: boolean };
  Favourites: undefined;
  Sell: undefined;
  Alert: undefined;
  Earnings: undefined;
  MySavedKeyword: undefined;
  PayMover: { package_details_id: string; price: string };
  Withdraw: { earning: string };
  PayoutHistory: undefined;
  OngoingMoverRequest: undefined;
  PastMoverRequest: undefined;
  AdminVerification: undefined;
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
  Notification: undefined;
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
  DeliveryCompleteAndRateDriver: undefined;
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

export interface HomeNavigationProps<RouteName extends keyof AppRoutes> {
  navigation: NativeStackNavigationProp<AppRoutes, RouteName>;
  route: RouteProp<AppRoutes, RouteName>;
}

export interface MyFrontStoreNavigationProps<
  RouteName extends keyof TopRoutes
> {
  navigation: NativeStackNavigationProp<TopRoutes, RouteName>;
  route: RouteProp<TopRoutes, RouteName>;
}
