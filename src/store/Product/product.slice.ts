import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../types/global.types";
import {
  addProductForSell,
  addProductSearchFilter,
  addRatingForItem,
  editProductForSell,
  publishUnpublishProduct,
  sendRequestToNearbyMovers,
  sendTheMessage,
  updateBuyerRatingStatus,
} from "./product.thunk";
import { ProductState } from "../../types/product.types";

const initialState: ProductState = {
  loading: LoadingState.REMOVE,
};

const product = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          addProductForSell.pending,
          addProductSearchFilter.pending,
          sendTheMessage.pending,
          publishUnpublishProduct.pending,
          sendRequestToNearbyMovers.pending,
          editProductForSell.pending,
          updateBuyerRatingStatus.pending,
          addRatingForItem.pending
        ),
        (state) => {
          state.loading = LoadingState.CREATE;
        }
      )
      .addMatcher(
        isAnyOf(
          addProductForSell.fulfilled,
          addProductSearchFilter.fulfilled,
          sendTheMessage.fulfilled,
          publishUnpublishProduct.fulfilled,
          sendRequestToNearbyMovers.fulfilled,
          editProductForSell.fulfilled,
          addProductForSell.rejected,
          addProductSearchFilter.rejected,
          sendTheMessage.rejected,
          publishUnpublishProduct.rejected,
          sendRequestToNearbyMovers.rejected,
          editProductForSell.rejected
        ),
        (state) => {
          state.loading = LoadingState.REMOVE;
        }
      );
  },
});

export default product.reducer;
