import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { GlobalState } from "./global.types";
import { SettingsStateProps } from "./settings.types";
import { AuthenticationState } from "./authentication.types";
import { UserProfileState } from "./user.types";
import { ProductState } from "./product.types";
import { PaymentCardState } from "./payment.types";
import { MyEarningState } from "./myEarning.types";
import { MoverBookingState } from "./moverBooking.types";
import { PackageStatusState } from "./packageStatus.types";

export interface RootReduxState {
  global: GlobalState;
  settings: SettingsStateProps;
  authentication: AuthenticationState;
  userProfile: UserProfileState;
  product: ProductState;
  paymentCard: PaymentCardState;
  myEarning: MyEarningState;
  moverBooking: MoverBookingState;
  packageStatus: PackageStatusState;
}

export type AppDispatch = ThunkDispatch<
  RootReduxState,
  unknown,
  Action<string>
>;

export type AppThunk<T = Promise<void> | void> = ThunkAction<
  T,
  RootReduxState,
  unknown,
  Action<string>
>;
