import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type AppRoutes = {
  Onboard: undefined;
  Onboard1: undefined;
  Splash: undefined;
  SelectRoll: undefined;
  BuyerSellerStack: undefined;
  MoverStack: undefined;
  Authentication: undefined;
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

export interface MainNavigationProps<RouteName extends keyof AppRoutes> {
  navigation: NativeStackNavigationProp<AppRoutes, 'Splash'>;
  route: RouteProp<AppRoutes, RouteName>;
}
