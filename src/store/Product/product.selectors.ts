import { createSelector } from "@reduxjs/toolkit";
import { RootReduxState } from "../../types/store.types";

const selectProductState = (state: RootReduxState) => state.product;

export const selectProductLoading = createSelector(
  [selectProductState],
  (product) => product.loading
);
