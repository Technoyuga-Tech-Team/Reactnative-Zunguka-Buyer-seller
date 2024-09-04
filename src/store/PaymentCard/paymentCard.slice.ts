import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { LoadingState } from "../../types/global.types";
import { PaymentCardState } from "../../types/payment.types";
import {
  AddNewCard,
  deletePaymentCard,
  MakePayment,
  MakePaymentToMover,
  userDeliveryAddress,
  userPayDepositMover,
  userPayDepositSeller,
  userUpdateDeliveryAddress,
} from "./paymentCard.thunk";

const initialState: PaymentCardState = {
  loading: LoadingState.REMOVE,
};

const payment = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          AddNewCard.pending,
          deletePaymentCard.pending,
          MakePayment.pending,
          MakePaymentToMover.pending,
          userDeliveryAddress.pending,
          userUpdateDeliveryAddress.pending,
          userPayDepositSeller.pending,
          userPayDepositMover.pending
        ),
        (state) => {
          state.loading = LoadingState.CREATE;
        }
      )
      .addMatcher(
        isAnyOf(
          AddNewCard.fulfilled,
          deletePaymentCard.fulfilled,
          MakePayment.fulfilled,
          MakePaymentToMover.fulfilled,
          userDeliveryAddress.fulfilled,
          userUpdateDeliveryAddress.fulfilled,
          userPayDepositSeller.fulfilled,
          userPayDepositMover.fulfilled,
          AddNewCard.rejected,
          deletePaymentCard.rejected,
          MakePayment.rejected,
          MakePaymentToMover.rejected,
          userDeliveryAddress.rejected,
          userUpdateDeliveryAddress.rejected,
          userPayDepositSeller.rejected,
          userPayDepositMover.rejected
        ),
        (state) => {
          state.loading = LoadingState.REMOVE;
        }
      );
  },
});

export default payment.reducer;
