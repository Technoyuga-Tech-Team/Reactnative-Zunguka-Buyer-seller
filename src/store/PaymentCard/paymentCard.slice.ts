import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { LoadingState } from "../../types/global.types";
import { PaymentCardState } from "../../types/payment.types";
import {
  AddNewCard,
  deletePaymentCard,
  MakePayment,
  MakePaymentToMover,
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
          MakePaymentToMover.pending
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
          AddNewCard.rejected,
          deletePaymentCard.rejected,
          MakePayment.rejected,
          MakePaymentToMover.rejected
        ),
        (state) => {
          state.loading = LoadingState.REMOVE;
        }
      );
  },
});

export default payment.reducer;
