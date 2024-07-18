import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../types/global.types";
import { addProductForSell, addProductFilter } from "./product.thunk";
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
        isAnyOf(addProductForSell.pending, addProductFilter.pending),
        (state) => {
          state.loading = LoadingState.CREATE;
        }
      )
      .addMatcher(
        isAnyOf(
          addProductForSell.fulfilled,
          addProductFilter.fulfilled,
          addProductForSell.rejected,
          addProductFilter.rejected
        ),
        (state) => {
          state.loading = LoadingState.REMOVE;
        }
      );
  },
});

export default product.reducer;
