import { createSelector } from "@reduxjs/toolkit";
import { RootReduxState } from "../../types/store.types";

const selectPaymentCardState = (state: RootReduxState) => state.paymentCard;

export const selectPaymentCardLoading = createSelector(
  [selectPaymentCardState],
  (payment) => payment.loading
);
