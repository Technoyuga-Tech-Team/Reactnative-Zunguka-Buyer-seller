import { combineReducers } from "@reduxjs/toolkit";
import { RootReduxState } from "../types/store.types";
import global from "../store/global/global.slice";
import authentication from "../store/authentication/authentication.slice";
import moverBooking from "../store/MoverBooking/moverBooking.slice";
import myEarning from "../store/MyEarning/myEarning.slice";
import notification from "../store/Notification/notification.slice";
import packageStatus from "../store/PackageStatus/packageStatus.slice";
import paymentCard from "../store/PaymentCard/paymentCard.slice";
import product from "../store/Product/product.slice";
import settings from "../store/settings/settings.slice";
import userProfile from "../store/userprofile/userprofile.slice";

const rootReducer = combineReducers<RootReduxState>({
  global,
  settings,
  authentication,
  userProfile,
  product,
  paymentCard,
  myEarning,
  packageStatus,
  notification,
  moverBooking,
});

export default rootReducer;
