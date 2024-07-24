import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../types/global.types";
import { addProductForSell, addProductSearchFilter } from "./product.thunk";
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
        isAnyOf(addProductForSell.pending, addProductSearchFilter.pending),
        (state) => {
          state.loading = LoadingState.CREATE;
        }
      )
      .addMatcher(
        isAnyOf(
          addProductForSell.fulfilled,
          addProductSearchFilter.fulfilled,
          addProductForSell.rejected,
          addProductSearchFilter.rejected
        ),
        (state) => {
          state.loading = LoadingState.REMOVE;
        }
      );
  },
});

export default product.reducer;
